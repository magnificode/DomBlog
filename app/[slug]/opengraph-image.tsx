import { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/posts';
import { toCompactDate } from '@/lib/utils';

export const runtime = 'edge';

export const alt = 'Blog post Open Graph image';

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

async function loadGoogleFont(family: string, options?: { weight?: number; italic?: boolean }) {
	const weight = options?.weight ?? 400;
	const italic = options?.italic ?? false;
	const axis = italic ? `ital,wght@1,${weight}` : `wght@${weight}`;

	const css = await fetch(
		`https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:${axis}`,
		{
			headers: {
				// Request TTF format (required by Satori)
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
	const post = getPostBySlug(slug);

	if (!post) {
		notFound();
	}

	const [serifFont, monoFont] = await Promise.all([
		loadGoogleFont('Instrument Serif', { weight: 400, italic: true }),
		loadGoogleFont('JetBrains Mono', { weight: 400 }),
	]);

	const publishedDate = toCompactDate(post.date);
	const primaryTag = post.tags[0] ?? 'blog';
	const excerpt = post.excerpt ? truncateText(post.excerpt, 140) : '';

	// Adaptive title sizing based on character count
	const titleLength = post.title.length;
	const titleSize = titleLength > 55 ? 58 : titleLength > 35 ? 68 : 78;

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
				{/* Ambient glow — top left, behind title */}
				<div
					style={{
						position: 'absolute',
						top: '-180px',
						left: '-80px',
						width: '700px',
						height: '700px',
						background:
							'radial-gradient(circle, rgba(56, 217, 127, 0.05) 0%, transparent 65%)',
					}}
				/>

				{/* Ambient glow — bottom right, for balance */}
				<div
					style={{
						position: 'absolute',
						bottom: '-300px',
						right: '-200px',
						width: '600px',
						height: '600px',
						background:
							'radial-gradient(circle, rgba(56, 217, 127, 0.03) 0%, transparent 65%)',
					}}
				/>

				{/* ── Top: brand bar ── */}
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
					<span>dommagnifi.co</span>
				</div>

				{/* ── Center: title + accent + excerpt ── */}
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
						{post.title}
					</div>

					{/* Accent bar */}
					<div
						style={{
							width: '64px',
							height: '2px',
							backgroundColor: '#38d97f',
							marginTop: '32px',
						}}
					/>

					{excerpt ? (
						<div
							style={{
								fontSize: 19,
								lineHeight: 1.55,
								color: 'rgba(242, 240, 236, 0.48)',
								maxWidth: '72%',
								marginTop: '24px',
							}}
						>
							{excerpt}
						</div>
					) : null}
				</div>

				{/* ── Bottom: metadata ── */}
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
					<span style={{ opacity: 0.4 }}>&middot;</span>
					<span>{post.metadata.readingTime} min read</span>
				</div>
			</div>
		),
		{
			...size,
			fonts: [
				{
					name: 'Instrument Serif',
					data: serifFont,
					style: 'italic',
					weight: 400,
				},
				{
					name: 'JetBrains Mono',
					data: monoFont,
					weight: 400,
				},
			],
		},
	);
}
