'use client';

import styles from './text-wrap-balance-demo.module.css';

const PARAGRAPH =
	'Great typography is invisible. Readers flow through content without noticing where lines break or how words are distributed. But a single orphaned word stranded on the final line of a paragraph disrupts the rhythm and pulls attention away from the meaning.';

export function TextWrapBalancePrettyDemo() {
	return (
		<section className={styles.panel}>
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
	);
}
