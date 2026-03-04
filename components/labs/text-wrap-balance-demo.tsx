'use client';

import styles from './text-wrap-balance-demo.module.css';

const HEADING = 'Crafting Meaningful Digital Experiences for Every User';

const PARAGRAPH =
	'Great typography is invisible. Readers flow through content without noticing where lines break or how words are distributed. But a single orphaned word stranded on the final line of a paragraph disrupts the rhythm and pulls attention away from the meaning.';

export function TextWrapBalanceDemo() {
	return (
		<div className={styles.root}>
			<section className={styles.panel}>
				<div className={styles.panelHead}>
					<h3 className={styles.title}>Part 1: text-wrap: balance</h3>
					<p className={styles.text}>
						Distributes text evenly across lines — no more orphan words dangling off headings.
					</p>
				</div>

				<div className={styles.comparison}>
					<div className={styles.column}>
						<p className={styles.label}>Default wrapping</p>
						<h3 className={styles.demoHeading}>{HEADING}</h3>
						<p className={styles.orphanHighlight}>
							<code>text-wrap: wrap</code>
						</p>
					</div>
					<div className={`${styles.column} ${styles.columnActive}`}>
						<p className={`${styles.label} ${styles.labelActive}`}>Balanced</p>
						<h3 className={`${styles.demoHeading} ${styles.balanced}`}>{HEADING}</h3>
						<p className={styles.orphanHighlight}>
							<code>text-wrap: balance</code>
						</p>
					</div>
				</div>
			</section>

			<section className={styles.panel}>
				<div className={styles.panelHead}>
					<h3 className={styles.title}>Part 2: text-wrap: pretty</h3>
					<p className={styles.text}>
						Prevents a single lonely word on the last line of paragraphs.
					</p>
				</div>

				<div className={styles.comparison}>
					<div className={styles.column}>
						<p className={styles.label}>Default wrapping</p>
						<p className={styles.demoParagraph}>{PARAGRAPH}</p>
						<p className={styles.orphanHighlight}>
							<code>text-wrap: wrap</code>
						</p>
					</div>
					<div className={`${styles.column} ${styles.columnActive}`}>
						<p className={`${styles.label} ${styles.labelActive}`}>Pretty</p>
						<p className={`${styles.demoParagraph} ${styles.pretty}`}>{PARAGRAPH}</p>
						<p className={styles.orphanHighlight}>
							<code>text-wrap: pretty</code>
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
