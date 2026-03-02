import type { Metadata } from 'next';

const projects = [
	{
		name: 'House of Giants',
		role: 'Founder',
		summary: 'Built a frontend-focused studio and shipped client projects.',
	},
	{
		name: '10up',
		role: 'Lead Front-End Engineer',
		summary: 'Led frontend implementation across publisher and enterprise sites.',
	},
	{
		name: 'Special Olympics of Colorado',
		role: 'Lead Developer',
		summary: 'Built and launched a WordPress event and content platform.',
	},
	{
		name: 'Industry Denver',
		role: 'Lead Developer',
		summary: 'Built a responsive custom site with tenant and event workflows.',
	},
];

export const metadata: Metadata = {
	title: 'Projects',
	description: 'Selected projects and roles from Dominic Magnifico',
	alternates: {
		canonical: 'https://dommagnifi.co/projects',
	},
};

export default function ProjectsPage() {
	return (
		<main className="mx-auto max-w-3xl px-5 pt-14 pb-20 sm:px-8">
			<section className="fade-in-up">
				<h1 className="display-serif text-[clamp(2rem,5vw,3.2rem)]">Projects</h1>
				<p className="mt-6 max-w-2xl text-sm leading-relaxed text-dim">
					A short list of teams and projects I&apos;ve worked on.
				</p>
			</section>

			<section className="fade-in-up stagger-2 mt-10 space-y-4">
				{projects.map((project) => (
					<article key={project.name} className="rounded-sm border border-border/40 bg-card/20 p-5">
						<h2 className="text-base font-medium tracking-tight text-foreground">{project.name}</h2>
						<p className="mt-1 text-[12px] uppercase tracking-wide text-dim">{project.role}</p>
						<p className="mt-3 text-sm leading-relaxed text-dim">{project.summary}</p>
					</article>
				))}
			</section>
		</main>
	);
}
