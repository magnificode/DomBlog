import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'About',
	description: 'About Dom: frontend engineering, product systems, and practical web craft.',
	alternates: {
		canonical: 'https://dommagnifi.co/about',
	},
};

const practices = [
	'Design systems and UI architecture for teams.',
	'Performance work for real sites and real users.',
	'Accessibility and semantics built in from the start.',
	'Clear engineering standards and code review habits.',
];

const focusAreas = [
	'React & Next.js',
	'Application Architecture',
	'Content Platforms',
	'Publishing Systems',
	'Design Systems',
	'UI Consistency',
	'Frontend Performance',
	'Platform Reliability',
];

export default function AboutPage() {
	return (
		<main className="mx-auto max-w-3xl px-5 pt-16 pb-24 sm:px-8">
			{/* ── Hero ──────────────────────────────── */}
			<section className="fade-in-up">
				<div className="flex items-center gap-3">
					<span className="text-[13px] leading-none text-accent" aria-hidden="true">
						//
					</span>
					<p className="text-[11px] font-medium uppercase tracking-[0.25em] text-dim">About</p>
				</div>

				<h1 className="display-serif mt-5 max-w-[16ch] text-[clamp(2.4rem,7vw,4.5rem)]">
					About
				</h1>

				<p className="mt-8 max-w-xl text-[15px] leading-[1.85] text-dim">
					I&apos;m Dom. I build frontend platforms and product experiences that stay
					<span className="font-medium text-foreground"> fast</span>,{' '}
					<span className="font-medium text-foreground">readable</span>, and{' '}
					<span className="font-medium text-foreground">maintainable</span> as teams and features grow.
				</p>

				<div className="mt-10 flex items-center gap-1.5">
					<div className="accent-bar-grow h-[2px] w-10 bg-accent" />
					<div className="accent-bar-grow h-[2px] w-2 bg-accent/40 [animation-delay:200ms]" />
					<div className="accent-bar-grow h-[2px] w-1 bg-accent/20 [animation-delay:300ms]" />
				</div>
			</section>

			{/* ── How I Work ───────────────────────── */}
			<section className="fade-in-up stagger-1 mt-16">
				<div className="grid gap-4 md:grid-cols-[140px_1fr] md:gap-8">
					<h2 className="text-[11px] uppercase tracking-[0.2em] text-dim md:pt-3">How I Work</h2>
					<div className="space-y-1">
						{practices.map((item, i) => (
							<div
								key={i}
								className="group -mx-3 flex items-start gap-4 rounded-sm border border-transparent p-3 transition-colors duration-200 hover:border-border/30 hover:bg-card/15"
							>
								<span className="select-none pt-px text-[11px] tabular-nums text-accent/40 transition-colors group-hover:text-accent">
									0{i + 1}
								</span>
								<p className="text-sm leading-relaxed text-dim transition-colors duration-200 group-hover:text-foreground/80">
									{item}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── Focus Areas ──────────────────────── */}
			<section className="fade-in-up stagger-2 mt-14">
				<div className="grid gap-4 md:grid-cols-[140px_1fr] md:gap-8">
					<h2 className="text-[11px] uppercase tracking-[0.2em] text-dim md:pt-2">Focus Areas</h2>
					<div className="flex flex-wrap gap-2">
						{focusAreas.map((tag) => (
							<span
								key={tag}
								className="rounded-sm border border-border/50 bg-card/25 px-3 py-1.5 text-[12px] text-dim transition-colors duration-200 hover:border-accent/40 hover:text-accent"
							>
								{tag}
							</span>
						))}
					</div>
				</div>
			</section>

			{/* ── Experience ───────────────────────── */}
			<section className="fade-in-up stagger-2 mt-14">
				<div className="grid gap-4 md:grid-cols-[140px_1fr] md:gap-8">
					<h2 className="text-[11px] uppercase tracking-[0.2em] text-dim md:pt-1.5">Experience</h2>
					<div className="space-y-5 border-l-2 border-accent/15 pl-6">
						<p className="text-sm leading-[1.85] text-dim">
							I&apos;ve worked across agency and product environments, from large client platforms to small teams.
						</p>
						<p className="text-sm leading-[1.85] text-dim">
							This blog is where I share practical notes from that work.
						</p>
					</div>
				</div>
			</section>

			{/* ── CTA ──────────────────────────────── */}
			<section className="fade-in-up stagger-3 mt-16">
				<div className="about-cta relative overflow-hidden rounded-sm border border-accent/20 p-6">
					<h2 className="text-sm font-medium tracking-tight text-foreground">Contact</h2>
					<p className="mt-3 max-w-lg text-sm leading-relaxed text-dim">
						If you want to talk, send me a message.
					</p>
					<p className="mt-5">
						<Link
							className="group/cta inline-flex items-center gap-2 text-sm text-accent underline decoration-accent/40 underline-offset-4 transition-all hover:decoration-accent"
							href="/contact"
						>
							Contact{' '}
							<span
								aria-hidden="true"
								className="inline-block transition-transform duration-200 group-hover/cta:translate-x-1"
							>
								&rarr;
							</span>
						</Link>
					</p>
				</div>
			</section>
		</main>
	);
}
