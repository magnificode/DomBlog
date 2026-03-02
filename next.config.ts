import type { NextConfig } from 'next';

const isDev = process.argv.indexOf('dev') !== -1;
const isBuild = process.argv.indexOf('build') !== -1;

if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
	process.env.VELITE_STARTED = '1';
	import('velite').then((m) => m.build({ watch: isDev, clean: !isDev }));
}

const nextConfig: NextConfig = {
	trailingSlash: true,
	async redirects() {
		return [
			{
				source: '/update/:year/:month/:day/:slug.html',
				destination: '/:year-:month-:day-:slug/',
				permanent: true,
			},
			{
				source: '/update/2016/05/16/basic-class-toggle-with-vanilla-js.html',
				destination: '/2016-05-16-basic-class-toggle-with-vanilla-js/',
				permanent: true,
			},
			{
				source: '/update/2015/12/29/2015.html',
				destination: '/2015-12-29-%F0%9F%91%8B-2015/',
				permanent: true,
			},
			{
				source: '/2023-03-31-server-components-in-next-13/',
				destination: '/2023-03-29-server-components-in-next-13/',
				permanent: true,
			},
			{
				source: '/2023-03-31-exploring-server-components-next-13/',
				destination: '/2023-03-29-server-components-in-next-13/',
				permanent: true,
			},
			{
				source: '/work/',
				destination: '/',
				permanent: true,
			},
			{
				source: '/resume/',
				destination: '/',
				permanent: true,
			},
		];
	},
};

export default nextConfig;
