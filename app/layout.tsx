import type { Metadata } from 'next';
import Link from 'next/link';
import { Instrument_Serif, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { NoiseLayer } from '@/components/ui/noise-layer';
import { ScanlineLayer } from '@/components/ui/scanline-layer';
import { PostHogProvider } from '@/components/analytics/posthog-provider';
import './globals.css';

const mono = JetBrains_Mono({
	subsets: ['latin'],
	variable: '--font-mono',
	display: 'swap',
	weight: ['400', '500', '600', '700'],
});

const serif = Instrument_Serif({
	subsets: ['latin'],
	variable: '--font-serif',
	display: 'swap',
	weight: '400',
	style: ['normal', 'italic'],
});

const spaceGrotesk = Space_Grotesk({
	subsets: ['latin'],
	variable: '--font-space-grotesk',
	display: 'swap',
	weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
	metadataBase: new URL('https://dommagnifi.co'),
	title: {
		default: 'Magnificode',
		template: '%s | Magnificode',
	},
	icons: {
		icon: '/favicon.png',
	},
	description: 'Thoughts from Dominic Magnifico',
	openGraph: {
		title: 'Magnificode',
		description: 'Thoughts from Dominic Magnifico',
		type: 'website',
		url: 'https://dommagnifi.co/',
	},
	twitter: {
		card: 'summary_large_image',
		creator: '@magnificode',
	},
	alternates: {
		canonical: 'https://dommagnifi.co/',
	},
};

const themeBootScript = `(function(){try{var key='dm-theme';var stored=localStorage.getItem(key);var theme=(stored==='light'||stored==='dark')?stored:'dark';document.documentElement.setAttribute('data-theme',theme);}catch(_e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" data-theme="dark" className={`${mono.variable} ${serif.variable} ${spaceGrotesk.variable}`}>
			<body className="flex min-h-screen flex-col antialiased">
				<PostHogProvider>
					<script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
					<NoiseLayer className="fixed inset-0 z-[-1]" />
					<ScanlineLayer className="fixed inset-0 z-[-1]" />
					<div className="ambient-glow pointer-events-none fixed inset-0 z-[-2]" aria-hidden="true" />

					<header className="border-border/50 bg-background/85 sticky top-0 z-40 border-b backdrop-blur-md">
						<div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3 sm:px-8">
							<div className="flex items-center gap-6">
								<Link href="/" className="focus-ring rounded-sm text-[13px] tracking-tight">
									<span className="text-accent" aria-hidden="true">
										&gt;
									</span>{' '}
									<span className="text-dim hover:text-foreground transition-colors">magnificode</span>
								</Link>
								<nav
									aria-label="Primary"
									className="text-dim flex items-center gap-3 text-[11px] sm:gap-4 sm:text-[12px]"
								>
									<Link href="/" className="hover:text-foreground transition-colors">
										blog
									</Link>
									<Link href="/archive" className="hover:text-foreground transition-colors">
										archive
									</Link>
									<Link href="/lab" className="hover:text-foreground transition-colors">
										lab
									</Link>
									<Link href="/about" className="hover:text-foreground transition-colors">
										about
									</Link>
									<Link href="/projects" className="hover:text-foreground transition-colors">
										projects
									</Link>
									<Link href="/contact" className="hover:text-foreground transition-colors">
										contact
									</Link>
								</nav>
							</div>
							<ThemeToggle />
						</div>
					</header>

					<div className="flex-1">{children}</div>

					<footer className="border-border/30 border-t py-6">
						<div className="mx-auto flex max-w-3xl items-end justify-between gap-4 px-5 sm:px-8">
							<p className="text-dim text-[11px]">
								<span className="text-accent/60" aria-hidden="true">
									&copy;
								</span>{' '}
								{new Date().getFullYear()} Dominic Magnifico
							</p>
							<div className="text-dim flex items-center gap-3 text-[11px]">
								<Link href="/rss.xml" className="hover:text-foreground transition-colors">
									rss
								</Link>
								<span aria-hidden="true">&middot;</span>
								<Link href="/contact" className="hover:text-foreground transition-colors">
									get in touch
								</Link>
							</div>
						</div>
					</footer>
				</PostHogProvider>
			</body>
		</html>
	);
}
