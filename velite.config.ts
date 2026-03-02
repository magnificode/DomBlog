import rehypeShiki from '@shikijs/rehype';
import { defineCollection, defineConfig, s } from 'velite';

const posts = defineCollection({
	name: 'Post',
	pattern: 'posts/**/*.md',
	schema: s
		.object({
			title: s.string().max(220),
			date: s.string(),
			description: s.string().optional(),
			layout: s.string().default('post'),
			url: s.string().optional(),
			publisher: s.string().optional(),
			categories: s.union([s.string(), s.array(s.string())]).optional(),
			tags: s.array(s.string()).default([]),
			featured: s.boolean().default(false),
			redirect_from: s.array(s.string()).default([]),
			rawSlug: s.path(),
			metadata: s.metadata(),
			content: s.markdown(),
		})
		.transform((data) => {
			const slug = data.rawSlug.replace(/^posts\//, '').replace(/\.md$/i, '');
			const permalink = `/${slug}/`;
			const external = data.layout === 'post-external' && !!data.url;
			const plainExcerpt = data.description?.trim() || '';
			const parsedDate = new Date(data.date.replace(' ', 'T'));
			const normalizedDate = Number.isNaN(parsedDate.getTime()) ? data.date : parsedDate.toISOString();
			const categoryTags = Array.isArray(data.categories)
				? data.categories
				: typeof data.categories === 'string'
					? [data.categories]
					: [];
			const tags = [...new Set([...categoryTags, ...data.tags].map((tag) => tag.trim()).filter(Boolean))];
			return {
				...data,
				date: normalizedDate,
				slug,
				permalink,
				external,
				excerpt: plainExcerpt,
				tags,
			};
		}),
});

export default defineConfig({
	root: 'content',
	output: {
		data: '.velite',
		assets: 'public/static',
		base: '/static/',
		name: '[name]-[hash:6].[ext]',
		clean: true,
	},
	collections: { posts },
	markdown: {
		rehypePlugins: [[rehypeShiki as never, { theme: 'material-theme-palenight', addLanguageClass: true }]],
	},
});
