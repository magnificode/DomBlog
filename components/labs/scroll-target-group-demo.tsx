import styles from './scroll-target-group-demo.module.css';

const scrollTargetGroupStyles = `
.stg-toc {
	scroll-target-group: auto;
}

.stg-toc a:target-current {
	border-color: color-mix(in oklch, var(--accent) 45%, var(--line));
	background: color-mix(in oklch, var(--accent) 16%, var(--bg));
	color: var(--fg);
	translate: 0.18rem 0;
}

.stg-toc a:target-current span {
	color: var(--accent);
}

.stg-toc a:target-current::before {
	opacity: 1;
	translate: 0 -50%;
}

@supports (scroll-target-group: auto) and selector(a:target-current) {
	.stg-supported-note {
		display: block;
	}

	.stg-unsupported-note {
		display: none;
	}
}

@media (prefers-reduced-motion: reduce) {
	.stg-toc a:target-current {
		translate: 0 0;
	}
}
`;

const sections = [
	{
		id: 'sg-overview',
		title: 'Overview',
		label: '01',
		body: [
			'This little docs page has five regular fragment links. Click one and the article pane scrolls to the matching section.',
			'In supporting browsers, the table of contents also tracks the section currently in view while you scroll.',
		],
	},
	{
		id: 'sg-install',
		title: 'Install',
		label: '02',
		body: [
			'The target sections are just normal elements with IDs. There is no hidden observer, no scroll listener, and no active class getting pushed around by React.',
			'Keyboard users can tab through the links, activate them, then focus the article pane and keep reading with normal scrolling keys.',
		],
	},
	{
		id: 'sg-tokens',
		title: 'Tokens',
		label: '03',
		body: [
			'The table of contents wrapper opts into scroll marker grouping with scroll-target-group: auto.',
			'After that, the browser can match each anchor to its target and expose the current one to CSS as a pseudo-class.',
		],
	},
	{
		id: 'sg-motion',
		title: 'Motion',
		label: '04',
		body: [
			'The marker is intentionally small: a dot, a background tint, and a little movement on the active link.',
			'The article pane uses smooth scrolling as a nicety, then turns it off for people who prefer reduced motion.',
		],
	},
	{
		id: 'sg-caveat',
		title: 'Support Caveat',
		label: '05',
		body: [
			'Unsupported browsers still get the useful part of the interface: semantic links that jump to real headings.',
			'The automatic current-section highlight is the progressive enhancement, not the whole navigation system.',
		],
	},
];

export function ScrollTargetGroupDemo() {
	return (
		<div className={styles.root}>
			<style>{scrollTargetGroupStyles}</style>

			<header className={styles.header}>
				<div>
					<p className={styles.kicker}>Docs pane</p>
					<h3>Current section, browser tracked</h3>
				</div>
				<p className={styles.summary}>Scroll the article pane. The table of contents highlights the section in view.</p>
			</header>

			<div className={styles.supportWrap} aria-live="polite">
				<p className={`${styles.supportedNote} stg-supported-note`}>
					This browser supports <code>scroll-target-group</code>. The active link below is CSS-driven.
				</p>
				<p className={`${styles.unsupportedNote} stg-unsupported-note`}>
					This browser does not support <code>scroll-target-group</code> with <code>:target-current</code> yet. The
					links still work, but the active highlight will not track scrolling.
				</p>
			</div>

			<div className={styles.shell}>
				<nav className={`${styles.toc} stg-toc`} aria-label="Demo article sections">
					<ol>
						{sections.map((section) => (
							<li key={section.id}>
								<a href={`#${section.id}`}>
									<span aria-hidden="true">{section.label}</span>
									{section.title}
								</a>
							</li>
						))}
					</ol>
				</nav>

				<article className={styles.article} aria-label="Demo documentation article" tabIndex={0}>
					{sections.map((section) => (
						<section key={section.id} id={section.id} className={styles.section}>
							<div className={styles.sectionNumber} aria-hidden="true">
								{section.label}
							</div>
							<div className={styles.sectionContent}>
								<h4>{section.title}</h4>
								{section.body.map((paragraph) => (
									<p key={paragraph}>{paragraph}</p>
								))}
							</div>
						</section>
					))}
				</article>
			</div>
		</div>
	);
}
