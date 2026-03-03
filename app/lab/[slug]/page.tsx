import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allLabs, getLabBySlug } from '@/lib/labs';
import { toCompactDate } from '@/lib/utils';
import { LabDemo } from '@/components/labs/lab-demo';
import { labDemos } from '@/components/labs/registry';

interface PageProps {
	params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
	return allLabs().map((lab) => ({ slug: lab.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const lab = getLabBySlug(slug);

	if (!lab) {
		return { title: 'Lab Not Found' };
	}

	const ogImage = `https://dommagnifi.co/lab/${lab.slug}/opengraph-image`;

	return {
		title: lab.title,
		description: lab.description,
		alternates: {
			canonical: `https://dommagnifi.co${lab.permalink}`,
		},
		openGraph: {
			title: lab.title,
			description: lab.description,
			url: `https://dommagnifi.co${lab.permalink}`,
			type: 'article',
			publishedTime: lab.date,
			images: [
				{
					url: ogImage,
					width: 1200,
					height: 630,
					alt: `${lab.title} — Magnificode Lab`,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			creator: '@magnificode',
			title: lab.title,
			description: lab.description,
			images: [ogImage],
		},
	};
}

export default async function LabPage({ params }: PageProps) {
	const { slug } = await params;
	const lab = getLabBySlug(slug);

	if (!lab) {
		notFound();
	}

	const DemoComponent = labDemos[lab.slug];

	return (
		<main className="mx-auto max-w-3xl px-5 pt-10 pb-24 sm:px-8">
			<nav className="fade-in-up">
				<Link
					href="/lab/"
					className="focus-ring text-dim hover:text-accent inline-flex items-center gap-1.5 rounded-sm text-[12px] transition-colors"
				>
					<span aria-hidden="true">&larr;</span> lab
				</Link>
			</nav>

			<header className="fade-in-up stagger-1 mt-10 mb-10">
				<div className="text-dim flex items-center gap-3 text-[12px]">
					<time dateTime={lab.date}>{toCompactDate(lab.date)}</time>
					{lab.tags.length > 0 ? (
						<>
							<span className="text-accent/40" aria-hidden="true">
								&middot;
							</span>
							<span>{lab.tags.join(', ')}</span>
						</>
					) : null}
				</div>
				<h1 className="display-serif mt-5 text-[clamp(1.75rem,4vw,2.75rem)]">{lab.title}</h1>
				<div className="terminal-divider mt-8" />
			</header>

			{/* Prose explanation */}
			<div
				className="fade-in-up stagger-2 prose prose-zinc mb-10"
				dangerouslySetInnerHTML={{ __html: lab.content }}
			/>

			{/* Live demo */}
			{DemoComponent ? (
				<div className="fade-in-up stagger-3">
					<LabDemo code={lab.code} codeLanguage={lab.codeLanguage} slug={lab.slug}>
						<DemoComponent />
					</LabDemo>
				</div>
			) : null}
		</main>
	);
}
