'use client';

import { useState, useRef, useCallback } from 'react';
import styles from './scroll-margin-top-demo.module.css';

const sections = [
	{
		id: 'introduction',
		title: 'Introduction',
		body: 'Welcome to the documentation. This guide covers everything you need to get started with the project, from initial setup to advanced configuration.',
	},
	{
		id: 'installation',
		title: 'Installation',
		body: 'Run the install command to set up dependencies. Make sure you have Node.js 18+ and a package manager like npm or bun available on your system.',
	},
	{
		id: 'configuration',
		title: 'Configuration',
		body: 'Create a config file in your project root. You can customize theme colors, fonts, breakpoints, and plugin options to match your design system.',
	},
	{
		id: 'usage',
		title: 'Usage',
		body: 'Import components from the library and use them in your templates. Each component accepts props for customization and emits events for interactivity.',
	},
	{
		id: 'deployment',
		title: 'Deployment',
		body: 'Build your project for production with the build command. The output is a set of static files that can be deployed to any CDN or hosting provider.',
	},
];

const HEADER_HEIGHT = 44;

export function ScrollMarginTopDemo() {
	const [enabled, setEnabled] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
		e.preventDefault();
		const container = containerRef.current;
		const target = container?.querySelector(`#${id}`);
		if (!target || !container) return;
		target.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}, []);

	return (
		<div className={styles.root}>
			{/* Toggle */}
			<div className={styles.toggleRow}>
				<button
					type="button"
					onClick={() => setEnabled((v) => !v)}
					className={`${styles.togglePill} ${enabled ? styles.togglePillOn : ''}`}
					aria-pressed={enabled}
					aria-label={`Toggle anchor offset fix (${enabled ? 'on' : 'off'})`}
				>
					<span className={styles.toggleKnob} />
				</button>
				<span className={styles.toggleLabel}>
					<strong>{enabled ? 'Anchor offset fix: ON' : 'Anchor offset fix: OFF'}</strong>{' '}
					<code>({`scroll-margin-top: ${enabled ? '48px' : '0px'}`})</code>
				</span>
			</div>

			{/* Scrollable container */}
			<div ref={containerRef} className={styles.container}>
				{/* Sticky header with TOC */}
				<div className={styles.header}>
					<span className={styles.headerLabel}>Docs</span>
					<nav className={styles.nav}>
						{sections.map((s) => (
							<a
								key={s.id}
								href={`#${s.id}`}
								onClick={(e) => scrollTo(e, s.id)}
								className={styles.link}
							>
								{s.title}
							</a>
						))}
					</nav>
				</div>

				{/* Content sections */}
				<div className={styles.content}>
					{sections.map((s) => (
						<section key={s.id} className={styles.section}>
							<h4
								id={s.id}
								className={styles.heading}
								style={{ scrollMarginTop: enabled ? `${HEADER_HEIGHT + 4}px` : '0px' }}
							>
								{s.title}
							</h4>
							<p className={styles.body}>{s.body}</p>
						</section>
					))}
				</div>
			</div>

			{/* Status indicator */}
			<div className={styles.status}>
				<span className={enabled ? 'text-accent' : 'text-dim'} aria-hidden="true">
					{enabled ? '●' : '○'}
				</span>{' '}
				{enabled
					? 'Heading lands below the sticky header'
					: 'Click a nav link — the heading hides behind the header'}
			</div>
		</div>
	);
}
