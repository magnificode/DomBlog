import { labs } from '#site/content';

export function allLabs() {
	return [...labs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getLabBySlug(slug: string) {
	return allLabs().find((lab) => lab.slug === slug);
}
