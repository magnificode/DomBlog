import { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';
import { getLabBySlug } from '@/lib/labs';
import { toCompactDate } from '@/lib/utils';

export const runtime = 'edge';

export const alt = 'Lab demo Open Graph image';

export const size = {
	width: 1200,
	height: 630,
};

export const contentType = 'image/png';

interface OGImageProps {
	params: Promise<{ slug: string }>;
}

function truncateText(value: string, maxLength: number) {
	if (value.length <= maxLength) {
		return value;
	}
	return `${value.slice(0, maxLength - 1).trim()}\u2026`;
}

function extractCodePreview(code?: string) {
	if (!code?.trim()) {
		return '';
	}

	const normalized = code.replace(/\\n/g, '\n').trim();
	const fencedBlock = normalized.match(/```[a-zA-Z0-9_-]*\n([\s\S]*?)```/);

	if (fencedBlock) {
		return fencedBlock[1].trim();
	}

	return normalized.replace(/^:::section\s+.+$/gm, '').trim();
}

async function loadGoogleFont(family: string, options?: { weight?: number; italic?: boolean }) {
	const weight = options?.weight ?? 400;
	const italic = options?.italic ?? false;
	const axis = italic ? `ital,wght@1,${weight}` : `wght@${weight}`;

	const css = await fetch(
		`https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:${axis}`,
		{
			headers: {
				'User-Agent':
					'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
			},
		},
	).then((res) => res.text());

	const fontUrl = css.match(/src: url\((.+?)\)/)?.[1];
	if (!fontUrl) throw new Error(`Could not resolve font URL for ${family}`);

	return fetch(fontUrl).then((res) => res.arrayBuffer());
}

export default async function OGImage({ params }: OGImageProps) {
	const { slug } = await params;
	const lab = getLabBySlug(slug);

	if (!lab) {
		notFound();
	}

	const [serifFont, monoFont] = await Promise.all([
		loadGoogleFont('Instrument Serif', { weight: 400, italic: true }),
		loadGoogleFont('JetBrains Mono', { weight: 400 }),
	]);

	const publishedDate = toCompactDate(lab.date);
	const primaryTag = lab.tags[0] ?? 'lab';
	const description = truncateText(lab.description, 120);
	const codePreview = truncateText(extractCodePreview(lab.code), 80);

	const titleLength = lab.title.length;
	const titleSize = titleLength > 55 ? 52 : titleLength > 35 ? 62 : 72;

	return new ImageResponse(
		(
			<div
				style={{
					height: '100%',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					backgroundColor: '#0c0e0d',
					padding: '56px 64px',
					fontFamily: 'JetBrains Mono, monospace',
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				{/* Ambient glow — top left */}
				<div
					style={{
						position: 'absolute',
						top: '-180px',
						left: '-80px',
						width: '700px',
						height: '700px',
						background: 'radial-gradient(circle, rgba(56, 217, 127, 0.06) 0%, transparent 65%)',
					}}
				/>

				{/* Ambient glow — bottom right */}
				<div
					style={{
						position: 'absolute',
						bottom: '-300px',
						right: '-200px',
						width: '600px',
						height: '600px',
						background: 'radial-gradient(circle, rgba(56, 217, 127, 0.03) 0%, transparent 65%)',
					}}
				/>

				{/* Top: brand bar */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						fontSize: 17,
						color: 'rgba(242, 240, 236, 0.38)',
						letterSpacing: 1,
						textTransform: 'uppercase',
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
						<span style={{ color: '#38d97f', fontSize: 19 }}>{'>'}</span>
						<span>magnificode</span>
					</div>
					<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
						<span
							style={{
								color: '#38d97f',
								fontSize: 13,
								border: '1px solid rgba(56, 217, 127, 0.3)',
								padding: '2px 8px',
								borderRadius: '3px',
							}}
						>
							LAB
						</span>
						<span>dommagnifi.co/lab</span>
					</div>
				</div>

				{/* Center: title + code preview */}
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<div
						style={{
							fontFamily: 'Instrument Serif',
							fontStyle: 'italic',
							fontSize: titleSize,
							lineHeight: 1.08,
							letterSpacing: -2,
							color: '#f2f0ec',
							maxWidth: '92%',
						}}
					>
						{lab.title}
					</div>

					{/* Code preview chip */}
					{codePreview ? (
						<div
							style={{
								display: 'flex',
								marginTop: '28px',
								padding: '12px 18px',
								backgroundColor: 'rgba(56, 217, 127, 0.06)',
								border: '1px solid rgba(56, 217, 127, 0.15)',
								borderRadius: '6px',
								fontSize: 16,
								color: '#38d97f',
								maxWidth: '70%',
								whiteSpace: 'pre',
							}}
						>
							{codePreview}
						</div>
					) : null}

					{description ? (
						<div
							style={{
								fontSize: 18,
								lineHeight: 1.55,
								color: 'rgba(242, 240, 236, 0.42)',
								maxWidth: '72%',
								marginTop: '20px',
							}}
						>
							{description}
						</div>
					) : null}
				</div>

				{/* Bottom: metadata */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '16px',
						fontSize: 15,
						color: 'rgba(242, 240, 236, 0.32)',
						textTransform: 'uppercase',
						letterSpacing: 1,
					}}
				>
					<span style={{ color: 'rgba(56, 217, 127, 0.7)' }}>#{primaryTag}</span>
					<span style={{ opacity: 0.4 }}>&middot;</span>
					<span>{publishedDate}</span>
				</div>
			</div>
		),
		{
			...size,
			fonts: [
				{
					name: 'Instrument Serif',
					data: serifFont,
					style: 'italic' as const,
					weight: 400 as const,
				},
				{
					name: 'JetBrains Mono',
					data: monoFont,
					weight: 400 as const,
				},
			],
		},
	);
}
