import type { MetadataRoute } from 'next';
import { allTags, listedPosts, slugifyTag } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
	const postRoutes = listedPosts().map((post) => ({
		url: `https://dommagnifi.co${post.permalink}`,
		lastModified: new Date(post.date),
	}));

	const staticRoutes = ['/', '/about', '/projects', '/contact', '/archive', '/tags', '/search'].map((route) => ({
		url: `https://dommagnifi.co${route}`,
		lastModified: new Date(),
	}));

	const tagRoutes = allTags().map((tag) => ({
		url: `https://dommagnifi.co/tags/${slugifyTag(tag)}`,
		lastModified: new Date(),
	}));

	return [...staticRoutes, ...tagRoutes, ...postRoutes];
}
