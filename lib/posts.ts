import { posts } from '#site/content';

export function allPosts() {
	return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function listedPosts() {
	return allPosts().filter((post) => !post.external);
}

export function getPostBySlug(slug: string) {
	return allPosts().find((post) => post.slug === slug);
}

export function featuredPosts() {
	return listedPosts().filter((post) => post.featured);
}

export function allTags() {
	const unique = new Set<string>();
	for (const post of allPosts()) {
		for (const tag of post.tags) {
			unique.add(tag);
		}
	}
	return [...unique].sort((a, b) => a.localeCompare(b));
}

export function slugifyTag(tag: string) {
	return tag.toLowerCase().trim().replaceAll(/\s+/g, '-');
}

export function tagFromSlug(tagSlug: string) {
	return allTags().find((tag) => slugifyTag(tag) === tagSlug);
}

export function postsByTag(tag: string) {
	return allPosts().filter((post) => post.tags.includes(tag));
}

export function postsByYear() {
	const groups = new Map<number, ReturnType<typeof allPosts>>();
	for (const post of allPosts()) {
		const year = new Date(post.date).getFullYear();
		const existing = groups.get(year) ?? [];
		existing.push(post);
		groups.set(year, existing);
	}
	return [...groups.entries()].sort((a, b) => b[0] - a[0]);
}

export interface SearchablePost {
	slug: string;
	title: string;
	excerpt: string;
	permalink: string;
	date: string;
	readingTime: number;
	tags: string[];
	external: boolean;
	url?: string;
}

export function searchablePostIndex(): SearchablePost[] {
	return allPosts().map((post) => ({
		slug: post.slug,
		title: post.title,
		excerpt: post.excerpt ?? '',
		permalink: post.permalink,
		date: post.date,
		readingTime: post.metadata.readingTime,
		tags: post.tags,
		external: post.external,
		url: post.url,
	}));
}
