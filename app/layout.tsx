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

const themeBootScript = `(function(){try{var key='dm-theme';var stored=localStorage.getItem(key);var theme;if(stored==='light'||stored==='dark'){theme=stored;}else{theme=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',theme);}catch(_e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			lang="en"
			data-theme="dark"
			suppressHydrationWarning
			className={`${mono.variable} ${serif.variable} ${spaceGrotesk.variable}`}
		>
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
								<a
									href="https://github.com/magnificode"
									rel="me"
									className="hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
								>
									<svg
										aria-hidden="true"
										viewBox="0 0 24 24"
										className="h-3.5 w-3.5"
										fill="currentColor"
									>
										<path d="M12 2C6.477 2 2 6.486 2 12.02c0 4.428 2.865 8.184 6.839 9.51.5.094.682-.217.682-.483 0-.237-.008-.866-.013-1.7-2.782.605-3.369-1.345-3.369-1.345-.455-1.158-1.11-1.466-1.11-1.466-.909-.62.069-.608.069-.608 1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.09-.647.349-1.088.635-1.338-2.221-.253-4.556-1.113-4.556-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.027a9.564 9.564 0 0 1 2.504-.337 9.58 9.58 0 0 1 2.504.337c1.909-1.296 2.748-1.027 2.748-1.027.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.748 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.02C22 6.486 17.523 2 12 2Z" />
									</svg>
									<span>github.com/magnificode</span>
								</a>
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
