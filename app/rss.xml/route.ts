import { listedPosts } from '@/lib/posts';

function escapeXml(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

export async function GET() {
	const posts = listedPosts();

	const items = posts
		.map((post) => {
			const title = escapeXml(post.title);
			const description = escapeXml(post.excerpt || 'Thoughts from Dominic Magnifico');
			const link = `https://dommagnifi.co${post.permalink}`;
			return `<item><title>${title}</title><link>${link}</link><guid>${link}</guid><pubDate>${new Date(post.date).toUTCString()}</pubDate><description>${description}</description></item>`;
		})
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Magnificode</title><link>https://dommagnifi.co/</link><description>Thoughts from Dominic Magnifico</description>${items}</channel></rss>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
		},
	});
}
