import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { allPosts, getPostBySlug, slugifyTag } from '@/lib/posts';
import { toCompactDate } from '@/lib/utils';

interface PageProps {
	params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

interface WebmentionAuthor {
	name?: string;
	url?: string;
}

interface WebmentionContent {
	text?: string;
	value?: string;
}

interface WebmentionItem {
	author?: WebmentionAuthor;
	content?: WebmentionContent;
	published?: string;
	'wm-id'?: number;
	'wm-property'?: string;
	url?: string;
}

interface WebmentionResponse {
	children?: WebmentionItem[];
}

const WEBMENTION_API = 'https://webmention.io/api/mentions.jf2';

function toWebmentionLabel(wmProperty?: string) {
	if (wmProperty === 'like-of') return 'like';
	if (wmProperty === 'repost-of') return 'repost';
	if (wmProperty === 'in-reply-to') return 'reply';
	return 'mention';
}

function toWebmentionDateLabel(value: string) {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) {
		return null;
	}

	return toCompactDate(value);
}

async function getWebmentions(target: string): Promise<WebmentionItem[]> {
	try {
		const endpoint = `${WEBMENTION_API}?target=${encodeURIComponent(target)}&per-page=100`;
		const response = await fetch(endpoint, {
			next: { revalidate: 3600 },
		});

		if (!response.ok) {
			return [];
		}

		const data = (await response.json()) as WebmentionResponse;
		const mentions = Array.isArray(data.children) ? data.children : [];

		return mentions
			.filter((mention) => mention.author?.name || mention.url)
			.sort((a, b) => {
				const aDate = a.published ? new Date(a.published).getTime() : 0;
				const bDate = b.published ? new Date(b.published).getTime() : 0;
				return bDate - aDate;
			});
	} catch {
		return [];
	}
}

export function generateStaticParams() {
	return allPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const post = getPostBySlug(slug);

	if (!post) {
		return { title: 'Post Not Found' };
	}

	const ogImage = `https://dommagnifi.co/${post.slug}/opengraph-image`;

	return {
		title: post.title,
		description: post.excerpt || 'Thoughts from Dominic Magnifico',
		alternates: {
			canonical: `https://dommagnifi.co${post.permalink}`,
		},
		openGraph: {
			title: post.title,
			description: post.excerpt || 'Thoughts from Dominic Magnifico',
			url: `https://dommagnifi.co${post.permalink}`,
			type: 'article',
			publishedTime: post.date,
			images: [
				{
					url: ogImage,
					width: 1200,
					height: 630,
					alt: `${post.title} — Magnificode`,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			creator: '@magnificode',
			title: post.title,
			description: post.excerpt || 'Thoughts from Dominic Magnifico',
			images: [ogImage],
		},
	};
}

export default async function PostPage({ params }: PageProps) {
	const { slug } = await params;
	const post = getPostBySlug(slug);

	if (!post) {
		notFound();
	}

	if (post.external && post.url) {
		redirect(post.url);
	}

	const postUrl = `https://dommagnifi.co${post.permalink}`;
	const webmentions = await getWebmentions(postUrl);

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.title,
		datePublished: post.date,
		dateModified: post.date,
		mainEntityOfPage: postUrl,
		description: post.excerpt || 'Thoughts from Dominic Magnifico',
		author: {
			'@type': 'Person',
			name: 'Dominic Magnifico',
		},
	};

	return (
		<main className="mx-auto max-w-3xl px-5 pt-10 pb-24 sm:px-8">
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

			<nav className="fade-in-up">
				<Link
					href="/"
					className="focus-ring inline-flex items-center gap-1.5 rounded-sm text-[12px] text-dim transition-colors hover:text-accent"
				>
					<span aria-hidden="true">&larr;</span> back
				</Link>
			</nav>

			<header className="fade-in-up stagger-1 mt-10 mb-14">
				<div className="flex items-center gap-3 text-[12px] text-dim">
					<time dateTime={post.date}>{toCompactDate(post.date)}</time>
					<span className="text-accent/40" aria-hidden="true">
						&middot;
					</span>
					<span>{post.metadata.readingTime} min read</span>
					{post.external && post.publisher ? (
						<>
							<span className="text-accent/40" aria-hidden="true">
								&middot;
							</span>
							<span>published at {post.publisher}</span>
						</>
					) : null}
				</div>

				<h1 className="display-serif mt-5 text-[clamp(2rem,5vw,3.5rem)]">{post.title}</h1>

				{post.tags.length > 0 ? (
					<ul className="mt-6 flex flex-wrap gap-2">
						{post.tags.map((tag) => (
							<li key={tag}>
								<Link
									className="focus-ring rounded-sm border border-border/50 px-2 py-1 text-[11px] uppercase tracking-wide text-dim transition-colors hover:text-foreground"
									href={`/tags/${slugifyTag(tag)}`}
								>
									#{tag}
								</Link>
							</li>
						))}
					</ul>
				) : null}

				<div className="terminal-divider mt-8" />
			</header>

			<article className="fade-in-up stagger-2">
				<div className="prose prose-zinc" dangerouslySetInnerHTML={{ __html: post.content }} />
			</article>

			<footer className="fade-in-up stagger-3 mt-20">
				<div className="terminal-divider mb-10" />

				<div className="mt-10">
					<h2 className="text-sm tracking-tight text-foreground">
						Webmentions ({webmentions.length})
					</h2>
					<p className="mt-2 text-[12px] leading-relaxed text-dim">
						Replies, likes, reposts, and mentions from across the web.
					</p>

					{webmentions.length > 0 ? (
						<ul className="mt-6 space-y-4">
							{webmentions.map((mention, index) => {
								const content =
									mention.content?.text || mention.content?.value || '';
								const preview =
									content.length > 220
										? `${content.slice(0, 220).trim()}...`
										: content;
								const authorName = mention.author?.name || 'Unknown';
								const mentionUrl = mention.author?.url || mention.url;
								const dateLabel = mention.published
									? toWebmentionDateLabel(mention.published)
									: null;
								const key =
									mention['wm-id'] ??
									`${mention.url ?? 'mention'}-${mention.published ?? index}`;

								return (
									<li
										key={key}
										className="rounded-sm border border-border/40 bg-card/25 p-4"
									>
										<div className="flex items-center gap-2 text-[11px] text-dim">
											<span className="text-accent">
												{toWebmentionLabel(mention['wm-property'])}
											</span>
											{dateLabel ? (
												<>
													<span aria-hidden="true">&middot;</span>
													<time dateTime={mention.published}>
														{dateLabel}
													</time>
												</>
											) : null}
										</div>
										<p className="mt-2 text-[13px] text-foreground">
											{mentionUrl ? (
												<a
													href={mentionUrl}
													target="_blank"
													rel="noopener noreferrer"
													className="focus-ring rounded-sm font-semibold text-accent hover:underline"
												>
													{authorName}
												</a>
											) : (
												<span className="font-semibold text-foreground">
													{authorName}
												</span>
											)}
										</p>
										{preview ? (
											<p className="mt-2 text-[13px] leading-relaxed text-dim">
												{preview}
											</p>
										) : null}
									</li>
								);
							})}
						</ul>
					) : (
						<p className="mt-4 text-[13px] text-dim">No webmentions yet.</p>
					)}
				</div>
			</footer>
		</main>
	);
}
