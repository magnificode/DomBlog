'use client';

import { useState, useCallback } from 'react';
import type { LabCodeSection } from '@/lib/lab-code';

interface LabDemoProps {
	children: React.ReactNode;
	codeSections?: LabCodeSection[];
	slug: string;
}

function toLanguageLabel(language: string): string {
	if (language === 'javascript') return 'JS';
	if (language === 'typescript') return 'TS';
	return language.toUpperCase();
}

export function LabDemo({ children, codeSections, slug }: LabDemoProps) {
	const [showCode, setShowCode] = useState(false);
	const [copied, setCopied] = useState(false);
	const hasCode = !!codeSections?.length;

	const copyLink = useCallback(() => {
		const url = `${window.location.origin}/lab/${slug}/`;
		navigator.clipboard.writeText(url).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	}, [slug]);

	return (
		<div className="lab-demo-wrapper">
			{/* Demo area — screenshot-ready */}
			<div className="lab-demo-stage">{children}</div>

			{/* Actions bar */}
			<div className="lab-demo-actions">
				{hasCode ? (
					<button
						type="button"
						onClick={() => setShowCode((v) => !v)}
						className="lab-demo-btn"
						aria-expanded={showCode}
					>
						<span className="text-accent" aria-hidden="true">
							{showCode ? '−' : '+'}
						</span>{' '}
						{showCode ? 'Hide Code' : 'View Code'}
					</button>
				) : null}
				<button type="button" onClick={copyLink} className="lab-demo-btn">
					<span className="text-accent" aria-hidden="true">
						#
					</span>{' '}
					{copied ? 'Copied!' : 'Copy Link'}
				</button>
			</div>

			{/* Collapsible code block */}
			{showCode && hasCode ? (
				<div className="lab-demo-code fade-in">
					{codeSections.map((section, sectionIndex) => (
						<section key={`section-${sectionIndex}`} className="lab-demo-code-section">
							{section.title ? <h4 className="lab-demo-code-section-title">{section.title}</h4> : null}
							{section.blocks.map((block, blockIndex) => (
								<section key={`${sectionIndex}-${block.language}-${blockIndex}`} className="lab-demo-code-block">
									<header className="lab-demo-code-label">{toLanguageLabel(block.language)}</header>
									<div dangerouslySetInnerHTML={{ __html: block.highlightedHtml }} />
								</section>
							))}
						</section>
					))}
				</div>
			) : null}
		</div>
	);
}
