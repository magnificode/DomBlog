import Link from 'next/link';
import type { Metadata } from 'next';
import { listedPosts } from '@/lib/posts';
import { toCompactDate } from '@/lib/utils';

export const metadata: Metadata = {
	title: 'Blog',
	description: 'Thoughts from Dominic Magnifico',
	alternates: {
		canonical: 'https://dommagnifi.co/',
	},
};

export default function HomePage() {
	const posts = listedPosts();

	return (
		<main className="mx-auto max-w-3xl px-5 pt-14 pb-20 sm:px-8">
			<section className="fade-in-up mb-16">
				<h1 className="dom-title" aria-label="DOM">
					<span aria-hidden="true">DOM</span>
				</h1>
				<p className="text-dim mt-3 max-w-lg text-[13px] leading-relaxed">
					I write about building cool things for the web.{' '}
				</p>
				<div className="terminal-divider mt-10 max-w-[200px]" />
			</section>

			<section className="fade-in-up stagger-2 space-y-6">
				{posts.map((post) => (
					<Link
						key={post.slug}
						href={post.permalink}
						className="focus-ring group border-border/40 hover:bg-card/50 -mx-4 block rounded-sm border px-4 py-8 transition-colors"
					>
						<div className="text-dim flex items-center gap-3 text-[11px]">
							<time dateTime={post.date}>{toCompactDate(post.date)}</time>
							<span className="text-accent/40" aria-hidden="true">
								&middot;
							</span>
							<span>{post.metadata.readingTime} min read</span>
						</div>
						<h2 className="group-hover:text-accent mt-2 text-[clamp(1rem,2vw,1.2rem)] font-medium tracking-tight transition-colors">
							{post.title}
						</h2>
						{post.excerpt ? (
							<p className="text-dim mt-3 line-clamp-2 max-w-xl text-[13px] leading-relaxed">{post.excerpt}</p>
						) : null}
						{post.tags.length > 0 ? (
							<div className="mt-4 flex flex-wrap gap-2">
								{post.tags.slice(0, 3).map((tag) => (
									<span
										key={tag}
										className="border-border/50 text-dim rounded-sm border px-2 py-0.5 text-[10px] tracking-wide uppercase"
									>
										#{tag}
									</span>
								))}
							</div>
						) : null}
					</Link>
				))}
			</section>

			<section className="fade-in-up stagger-3 border-border/40 text-dim mt-14 border-t pt-8 text-[13px]">
				<p>
					Browse by topic in{' '}
					<Link href="/tags" className="text-accent">
						tags
					</Link>
					, dig through the{' '}
					<Link href="/archive" className="text-accent">
						archive
					</Link>
					, or{' '}
					<Link href="/search" className="text-accent">
						search the back catalog
					</Link>
					.
				</p>
			</section>
		</main>
	);
}
