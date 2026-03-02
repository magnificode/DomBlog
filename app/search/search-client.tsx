'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { SearchablePost } from '@/lib/posts';
import { toCompactDate } from '@/lib/utils';

interface SearchClientProps {
	posts: SearchablePost[];
	initialQuery?: string;
}

function matchesQuery(post: SearchablePost, query: string) {
	const q = query.toLowerCase().trim();
	if (!q) return true;

	const haystack = [post.title, post.excerpt, post.tags.join(' ')].join(' ').toLowerCase();
	return haystack.includes(q);
}

export function SearchClient({ posts, initialQuery = '' }: SearchClientProps) {
	const [query, setQuery] = useState(initialQuery);

	const results = useMemo(() => posts.filter((post) => matchesQuery(post, query)), [posts, query]);

	return (
		<>
			<label htmlFor="search-input" className="sr-only">
				Search posts
			</label>
			<input
				autoComplete="off"
				className="w-full rounded-sm border border-border/50 bg-card/20 px-4 py-3 text-sm text-foreground outline-none ring-0 placeholder:text-dim focus:border-accent"
				id="search-input"
				name="q"
				onChange={(event) => setQuery(event.target.value)}
				placeholder="Search titles, descriptions, and tags"
				type="search"
				value={query}
			/>

			<p className="mt-4 text-[12px] text-dim">
				{results.length} result{results.length === 1 ? '' : 's'}
			</p>

			<ul className="mt-6 space-y-4">
				{results.map((post) => (
					<li key={post.slug} className="rounded-sm border border-border/40 px-4 py-4">
						<div className="flex items-center gap-3 text-[11px] text-dim">
							<time dateTime={post.date}>{toCompactDate(post.date)}</time>
							<span aria-hidden="true">&middot;</span>
							<span>{post.readingTime} min read</span>
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
					</li>
				))}
			</ul>
		</>
	);
}
