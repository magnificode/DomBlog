import type { Metadata } from 'next';

const projects = [
	{
		name: 'House of Giants',
		url: 'https://houseofgiants.com',
		label: 'houseofgiants.com',
		summary:
			'A product engineering partner for startups and complex product teams. Senior engineering leadership embedded from day one—not a dev shop, but a team that owns architecture, shapes product decisions, and ships to production.',
	},
	{
		name: 'OpenTrainer',
		url: 'https://opentrainer.app',
		label: 'opentrainer.app',
		summary: 'A workout app with AI features that builds personalized training programs and adapts to your progress.',
	},
	{
		name: 'WP Block Docs',
		url: 'https://www.wpblockdocs.com/blocks',
		label: 'wpblockdocs.com',
		summary:
			'A WordPress block reference for developers building with Gutenberg. Browse blocks, inspect options, and find what you need without digging through documentation.',
	},
];

export const metadata: Metadata = {
	title: 'Projects',
	description: 'Current projects from Dominic Magnifico',
	alternates: {
		canonical: 'https://dommagnifi.co/projects',
	},
};

export default function ProjectsPage() {
	return (
		<main className="mx-auto max-w-3xl px-5 pt-14 pb-20 sm:px-8">
			<section className="fade-in-up">
				<h1 className="display-serif text-[clamp(2rem,5vw,3.2rem)]">Projects</h1>
				<p className="text-dim mt-6 max-w-2xl text-sm leading-relaxed">Active projects and products I'm building.</p>
			</section>

			<section className="fade-in-up stagger-2 mt-10 space-y-4">
				{projects.map((project) => (
					<a
						key={project.name}
						href={project.url}
						rel="noopener noreferrer"
						target="_blank"
						className="focus-ring group border-border/40 bg-card/20 hover:border-accent/30 hover:bg-card/35 block rounded-sm border p-5 transition-colors"
					>
						<div className="flex items-start justify-between gap-4">
							<div>
								<h2 className="text-foreground group-hover:text-accent mt-1 text-base font-medium tracking-tight transition-colors">
									{project.name}
								</h2>
							</div>
							<span className="text-dim group-hover:text-accent text-[12px] tracking-wide uppercase transition-colors">
								Visit
							</span>
						</div>
						<p className="text-dim mt-3 max-w-2xl text-sm leading-relaxed">{project.summary}</p>
						<p className="text-accent decoration-accent/40 mt-4 text-[12px] underline underline-offset-4">
							{project.label}
						</p>
					</a>
				))}
			</section>
		</main>
	);
}
