import type { Metadata } from 'next';
import Link from 'next/link';
import { postsByYear } from '@/lib/posts';
import { toCompactDate } from '@/lib/utils';

export const metadata: Metadata = {
	title: 'Archive',
	description: 'Chronological archive of writing from Dominic Magnifico',
	alternates: {
		canonical: 'https://dommagnifi.co/archive',
	},
};

export default function ArchivePage() {
	const byYear = postsByYear();

	return (
		<main className="mx-auto max-w-3xl px-5 pt-14 pb-20 sm:px-8">
			<section className="fade-in-up">
				<h1 className="display-serif text-[clamp(2rem,5vw,3.2rem)]">Archive</h1>
				<p className="mt-5 text-sm text-dim">Every post, grouped by year.</p>
			</section>

			<section className="fade-in-up stagger-2 mt-10 space-y-10">
				{byYear.map(([year, posts]) => (
					<div key={year}>
						<h2 className="text-sm font-medium text-foreground">{year}</h2>
						<ul className="mt-4 space-y-3">
							{posts.map((post) => (
								<li key={post.slug} className="flex items-center gap-3 text-[13px]">
									<time className="w-24 shrink-0 text-dim" dateTime={post.date}>
										{toCompactDate(post.date)}
									</time>
									<span className="text-accent/40" aria-hidden="true">
										&middot;
									</span>
									{post.external && post.url ? (
										<a
											className="focus-ring rounded-sm text-foreground transition-colors hover:text-accent"
											href={post.url}
											rel="noopener noreferrer"
											target="_blank"
										>
											{post.title}
										</a>
									) : (
										<Link className="focus-ring rounded-sm text-foreground transition-colors hover:text-accent" href={post.permalink}>
											{post.title}
										</Link>
									)}
									{post.external ? <span className="text-[10px] uppercase tracking-wide text-dim">external</span> : null}
								</li>
							))}
						</ul>
					</div>
				))}
			</section>
		</main>
	);
}
