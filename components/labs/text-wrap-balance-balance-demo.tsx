'use client';

import styles from './text-wrap-balance-demo.module.css';

const HEADING = 'Crafting Meaningful Digital Experiences for Every User';

export function TextWrapBalanceBalanceDemo() {
	return (
		<section className={styles.panel}>
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
	);
}
