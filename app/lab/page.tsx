import Link from 'next/link';
import type { Metadata } from 'next';
import { allLabs } from '@/lib/labs';
import { toCompactDate } from '@/lib/utils';

export const metadata: Metadata = {
	title: 'Lab',
	description: 'Bite-sized CSS, JS, and React demos — interactive proof-of-concepts for the web.',
	alternates: {
		canonical: 'https://dommagnifi.co/lab/',
	},
};

export default function LabIndexPage() {
	const labs = allLabs();

	return (
		<main className="mx-auto max-w-3xl px-5 pt-14 pb-20 sm:px-8">
			<section className="fade-in-up mb-16">
				<h1 className="ascii-title text-[clamp(2.5rem,10vw,4.5rem)]">Lab</h1>
				<p className="text-dim mt-3 max-w-lg text-[13px] leading-relaxed">Bite sized demos.</p>
				<div className="terminal-divider mt-10 max-w-[200px]" />
			</section>

			<section className="fade-in-up stagger-2 grid gap-4 sm:grid-cols-2">
				{labs.map((lab) => (
					<Link
						key={lab.slug}
						href={lab.permalink}
						className="focus-ring group border-border/40 hover:bg-card/50 block rounded-sm border px-5 py-6 transition-colors"
					>
						<div className="text-dim flex items-center gap-3 text-[11px]">
							<time dateTime={lab.date}>{toCompactDate(lab.date)}</time>
						</div>
						<h2 className="group-hover:text-accent mt-2 text-[15px] leading-snug font-medium tracking-tight transition-colors">
							{lab.title}
						</h2>
						<p className="text-dim mt-2 line-clamp-2 text-[12px] leading-relaxed">{lab.description}</p>
						{lab.tags.length > 0 ? (
							<div className="mt-3 flex flex-wrap gap-1.5">
								{lab.tags.map((tag) => (
									<span
										key={tag}
										className="border-border/50 text-dim rounded-sm border px-1.5 py-0.5 text-[10px] tracking-wide uppercase"
									>
										{tag}
									</span>
								))}
							</div>
						) : null}
					</Link>
				))}
			</section>
		</main>
	);
}
