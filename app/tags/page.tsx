import type { Metadata } from 'next';
import Link from 'next/link';
import { allTags, postsByTag, slugifyTag } from '@/lib/posts';

export const metadata: Metadata = {
	title: 'Tags',
	description: 'Browse posts by topic',
	alternates: {
		canonical: 'https://dommagnifi.co/tags',
	},
};

export default function TagsPage() {
	const tags = allTags();

	return (
		<main className="mx-auto max-w-3xl px-5 pt-14 pb-20 sm:px-8">
			<section className="fade-in-up">
				<h1 className="display-serif text-[clamp(2rem,5vw,3.2rem)]">Tags</h1>
				<p className="mt-5 text-sm text-dim">Browse by topic.</p>
			</section>

			<section className="fade-in-up stagger-2 mt-10">
				<ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
					{tags.map((tag) => (
						<li key={tag}>
							<Link
								className="focus-ring flex items-center justify-between rounded-sm border border-border/40 px-4 py-3 text-[13px] transition-colors hover:bg-card/35"
								href={`/tags/${slugifyTag(tag)}`}
							>
								<span>#{tag}</span>
								<span className="text-dim">{postsByTag(tag).length}</span>
							</Link>
						</li>
					))}
				</ul>
			</section>
		</main>
	);
}
