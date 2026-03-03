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

	return `${value.slice(0, maxLength - 1).trim()}...`;
}

export default async function OGImage({ params }: OGImageProps) {
	const { slug } = await params;
	const post = getPostBySlug(slug);

	if (!post) {
		notFound();
	}

	const publishedDate = toCompactDate(post.date);
	const primaryTag = post.tags[0] ?? 'blog';
	const excerpt = post.excerpt ? truncateText(post.excerpt, 180) : 'Thoughts from Dominic Magnifico';

	return new ImageResponse(
		(
			<div
				style={{
					height: '100%',
					width: '100%',
					display: 'flex',
					position: 'relative',
					background:
						'radial-gradient(1200px 600px at -10% -20%, #1c3f2f 0%, transparent 60%), radial-gradient(1000px 500px at 110% 110%, #132d24 0%, transparent 65%), #0a0f0d',
					color: '#eef7f1',
					fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
					overflow: 'hidden',
					padding: '56px',
				}}
			>
				<div
					style={{
						position: 'absolute',
						inset: '0',
						opacity: 0.2,
						backgroundImage:
							'repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 4px)',
					}}
				/>

				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						width: '100%',
						height: '100%',
						border: '1px solid rgba(56, 217, 127, 0.35)',
						padding: '44px',
						background: 'linear-gradient(180deg, rgba(14,22,18,0.85) 0%, rgba(8,14,11,0.7) 100%)',
						position: 'relative',
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							fontSize: 24,
							letterSpacing: 0.5,
							color: 'rgba(209, 235, 220, 0.92)',
							textTransform: 'uppercase',
						}}
					>
						<div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
							<span style={{ color: '#38d97f' }}>{'>'}</span>
							<span>magnificode</span>
						</div>
						<div style={{ opacity: 0.8 }}>dommagnifi.co</div>
					</div>

					<div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '92%' }}>
						<div
							style={{
								display: 'inline-flex',
								alignItems: 'center',
								gap: '10px',
								fontSize: 22,
								color: '#9fc3af',
								textTransform: 'uppercase',
							}}
						>
							<span>{primaryTag}</span>
							<span style={{ color: '#38d97f' }}>•</span>
							<span>{publishedDate}</span>
						</div>

						<div
							style={{
								fontSize: 72,
								lineHeight: 1.04,
								fontWeight: 700,
								letterSpacing: -1.2,
								maxWidth: '100%',
								color: '#f0f8f3',
							}}
						>
							{post.title}
						</div>

						<div
							style={{
								fontSize: 28,
								lineHeight: 1.35,
								maxWidth: '90%',
								color: 'rgba(198, 222, 209, 0.85)',
							}}
						>
							{excerpt}
						</div>
					</div>

					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							fontSize: 22,
							color: '#9fc3af',
						}}
					>
						<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
							<span style={{ color: '#38d97f' }}>/</span>
							<span>{post.metadata.readingTime} min read</span>
						</div>
						<div style={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>Thoughts from Dominic Magnifico</div>
					</div>
				</div>
			</div>
		),
		size,
	);
}
