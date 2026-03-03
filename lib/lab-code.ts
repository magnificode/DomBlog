import { cache } from 'react';
import { getSingletonHighlighter } from 'shiki';

export interface LabCodeBlock {
	language: string;
	code: string;
	highlightedHtml: string;
}

export interface LabCodeSection {
	title?: string;
	blocks: LabCodeBlock[];
}

const SHIKI_THEME = 'material-theme-palenight';

const getHighlighter = cache(async () =>
	getSingletonHighlighter({
		themes: [SHIKI_THEME],
		langs: ['html', 'css', 'javascript', 'js', 'typescript', 'tsx', 'jsx', 'json', 'bash', 'text'],
	}),
);

function normalizeLanguage(language?: string): string {
	if (!language) return 'text';
	const value = language.toLowerCase().trim();
	if (value === 'js') return 'javascript';
	if (value === 'ts') return 'typescript';
	if (value === 'sh' || value === 'shell') return 'bash';
	if (value === 'plaintext') return 'text';
	return value;
}

function parseFencedBlocks(code: string, fallbackLanguage: string): Array<{ language: string; code: string }> {
	const fenceRegex = /```([a-zA-Z0-9_-]+)?\n([\s\S]*?)```/g;
	const blocks: Array<{ language: string; code: string }> = [];
	let match: RegExpExecArray | null = fenceRegex.exec(code);

	while (match) {
		blocks.push({
			language: normalizeLanguage(match[1] || fallbackLanguage),
			code: match[2].trim(),
		});
		match = fenceRegex.exec(code);
	}

	return blocks;
}

function detectLanguage(block: string, fallbackLanguage: string): string {
	const trimmed = block.trim();

	if (!trimmed) return fallbackLanguage;
	if (/^</.test(trimmed)) return 'html';
	if (/\/\/|\.dataset\b|^(const|let|var|function)\b/m.test(trimmed)) return 'javascript';
	if (/::|[{]|}\s*$|^\s*\/\*|^\s*[.#[]|^\s*@/.test(trimmed) || /:\s*[^;]+;/m.test(trimmed)) return 'css';
	return fallbackLanguage;
}

function splitMixedCode(code: string, fallbackLanguage: string): Array<{ language: string; code: string }> {
	const segments = code
		.split(/\n\s*\n/g)
		.map((segment) => segment.trim())
		.filter(Boolean)
		.map((segment) => ({
			language: detectLanguage(segment, fallbackLanguage),
			code: segment,
		}));

	if (segments.length <= 1) {
		return [{ language: fallbackLanguage, code: code.trim() }];
	}

	return segments;
}

function parseSections(code: string): Array<{ title?: string; content: string }> {
	const markerRegex = /^:::section\s+(.+)$/gm;
	const matches = [...code.matchAll(markerRegex)];

	if (matches.length === 0) {
		return [{ content: code }];
	}

	return matches.map((match, index) => {
		const start = (match.index ?? 0) + match[0].length;
		const end = matches[index + 1]?.index ?? code.length;
		return {
			title: match[1].trim(),
			content: code.slice(start, end).trim(),
		};
	});
}

function parseBlocks(content: string, fallbackLanguage: string): Array<{ language: string; code: string }> {
	const blocks = parseFencedBlocks(content, fallbackLanguage);
	return blocks.length > 0 ? blocks : splitMixedCode(content, fallbackLanguage);
}

export async function getHighlightedLabCodeSections(
	code?: string,
	codeLanguage?: string,
): Promise<LabCodeSection[] | undefined> {
	if (!code?.trim()) {
		return undefined;
	}

	const fallbackLanguage = normalizeLanguage(codeLanguage);
	const sections = parseSections(code);
	const highlighter = await getHighlighter();

	return sections.map((section) => ({
		title: section.title,
		blocks: parseBlocks(section.content, fallbackLanguage).map((block) => ({
			language: block.language,
			code: block.code,
			highlightedHtml: highlighter.codeToHtml(block.code, {
				lang: block.language,
				theme: SHIKI_THEME,
			}),
		})),
	}));
}
