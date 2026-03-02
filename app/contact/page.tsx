import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Contact',
	description: 'Contact Dominic Magnifico',
	alternates: {
		canonical: 'https://dommagnifi.co/contact',
	},
};

export default function ContactPage() {
	return (
		<main className="mx-auto max-w-3xl px-5 pt-14 pb-20 sm:px-8">
			<section className="fade-in-up">
				<h1 className="display-serif text-[clamp(2rem,5vw,3.2rem)]">Contact</h1>
				<p className="text-dim mt-6 max-w-2xl text-sm leading-relaxed">
					Email is the best way to reach me.
				</p>
				<div className="terminal-divider mt-8 max-w-[200px]" />
			</section>

			<section className="fade-in-up stagger-2 mt-8 space-y-3 text-sm">
				<p>
					Email:{' '}
					<a
						className="text-accent decoration-accent/50 underline underline-offset-4"
						href="mailto:dom@houseofgiants.com"
					>
						dom@houseofgiants.com
					</a>
				</p>
				<p>
					{' '}
					BlueSky:{' '}
					<a
						className="text-accent decoration-accent/50 underline underline-offset-4"
						href="https://bsky.app/profile/doom.codes"
						rel="noopener noreferrer"
						target="_blank"
					>
						@doom.codes
					</a>
				</p>
				<p>
					X / Twitter:{' '}
					<a
						className="text-accent decoration-accent/50 underline underline-offset-4"
						href="https://x.com/magnificode"
						rel="noopener noreferrer"
						target="_blank"
					>
						@magnificode
					</a>
				</p>
				<p>
					LinkedIn:{' '}
					<a
						className="text-accent decoration-accent/50 underline underline-offset-4"
						href="https://www.linkedin.com/in/dominic-magnifico/"
						rel="noopener noreferrer"
						target="_blank"
					>
						@dommagnifico
					</a>
				</p>
				<p>
					GitHub:{' '}
					<a
						className="text-accent decoration-accent/50 underline underline-offset-4"
						href="https://github.com/magnificode"
						rel="noopener noreferrer"
						target="_blank"
					>
						github.com/magnificode
					</a>
				</p>
			</section>
		</main>
	);
}
