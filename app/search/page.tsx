import type { Metadata } from 'next';
import { searchablePostIndex } from '@/lib/posts';
import { SearchClient } from './search-client';

interface SearchPageProps {
	searchParams: Promise<{ q?: string }>;
}

export const metadata: Metadata = {
	title: 'Search',
	description: 'Search the blog archive',
	alternates: {
		canonical: 'https://dommagnifi.co/search',
	},
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const { q } = await searchParams;
	const posts = searchablePostIndex();

	return (
		<main className="mx-auto max-w-3xl px-5 pt-14 pb-20 sm:px-8">
			<section className="fade-in-up">
				<h1 className="display-serif text-[clamp(2rem,5vw,3.2rem)]">Search</h1>
				<p className="mt-5 text-sm text-dim">Find posts by keyword, title, excerpt, or topic.</p>
			</section>
			<section className="fade-in-up stagger-2 mt-8">
				<SearchClient posts={posts} initialQuery={q ?? ''} />
			</section>
		</main>
	);
}
