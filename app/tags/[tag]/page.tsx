import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allTags, postsByTag, slugifyTag, tagFromSlug } from '@/lib/posts';
import { toCompactDate } from '@/lib/utils';

interface TagPageProps {
	params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
	return allTags().map((tag) => ({ tag: slugifyTag(tag) }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
	const { tag: tagSlug } = await params;
	const tag = tagFromSlug(tagSlug);

	if (!tag) {
		return { title: 'Tag Not Found' };
	}

	return {
		title: `Tag: ${tag}`,
		description: `Posts tagged ${tag}`,
		alternates: {
			canonical: `https://dommagnifi.co/tags/${tagSlug}`,
		},
	};
}

export default async function TagPage({ params }: TagPageProps) {
	const { tag: tagSlug } = await params;
	const tag = tagFromSlug(tagSlug);

	if (!tag) {
		notFound();
	}

	const posts = postsByTag(tag);

	return (
		<main className="mx-auto max-w-3xl px-5 pt-14 pb-20 sm:px-8">
			<section className="fade-in-up">
				<p className="text-[12px] text-dim">Topic</p>
				<h1 className="display-serif mt-2 text-[clamp(2rem,5vw,3.2rem)]">#{tag}</h1>
				<p className="mt-5 text-sm text-dim">{posts.length} posts</p>
			</section>

			<section className="fade-in-up stagger-2 mt-10 space-y-4">
				{posts.map((post) => (
					<div key={post.slug} className="rounded-sm border border-border/40 px-4 py-4">
						<div className="flex items-center gap-3 text-[11px] text-dim">
							<time dateTime={post.date}>{toCompactDate(post.date)}</time>
							<span aria-hidden="true">&middot;</span>
							<span>{post.metadata.readingTime} min read</span>
						</div>
						<h2 className="mt-2 text-base font-medium tracking-tight">
							{post.external && post.url ? (
								<a href={post.url} rel="noopener noreferrer" target="_blank" className="transition-colors hover:text-accent">
									{post.title}
								</a>
							) : (
								<Link href={post.permalink} className="transition-colors hover:text-accent">
									{post.title}
								</Link>
							)}
						</h2>
						{post.excerpt ? <p className="mt-2 text-[13px] leading-relaxed text-dim">{post.excerpt}</p> : null}
					</div>
				))}
			</section>
		</main>
	);
}
