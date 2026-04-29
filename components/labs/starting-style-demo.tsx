'use client';

import { useState } from 'react';
import styles from './starting-style-demo.module.css';

const messages = ['Webhook received', 'Preview deployed', 'Invoice exported', 'Access token rotated'] as const;

function getMessage(run: number) {
	return messages[run % messages.length];
}

export function StartingStyleDemo() {
	const [run, setRun] = useState(0);
	const message = getMessage(run);

	return (
		<div className={styles.root}>
			<div className={styles.toolbar}>
				<div>
					<p className={styles.kicker}>Replay the mount</p>
					<p className={styles.copy}>Both cards are new DOM nodes. Only the right one gets a CSS starting frame.</p>
				</div>
				<button type="button" className={styles.replayButton} onClick={() => setRun((value) => value + 1)}>
					Replay
				</button>
			</div>

			<div className={styles.comparison}>
				<section className={styles.column} aria-label="Transition without starting style">
					<div className={styles.columnHeader}>
						<span className={styles.statusDot} aria-hidden="true" />
						<p>No starting style</p>
					</div>
					<div className={styles.stage}>
						<article key={`plain-${run}`} className={styles.notice}>
							<span className={styles.noticeIcon} aria-hidden="true">
								#
							</span>
							<div>
								<h3>{message}</h3>
								<p>Inserted at the final state.</p>
							</div>
						</article>
					</div>
				</section>

				<section className={styles.column} aria-label="Transition with starting style">
					<div className={styles.columnHeader}>
						<span className={`${styles.statusDot} ${styles.statusDotActive}`} aria-hidden="true" />
						<p>With @starting-style</p>
					</div>
					<div className={styles.stage}>
						<article key={`starting-${run}`} className={`${styles.notice} ${styles.noticeStarting}`}>
							<span className={styles.noticeIcon} aria-hidden="true">
								#
							</span>
							<div>
								<h3>{message}</h3>
								<p>Transitions from the missing first frame.</p>
							</div>
						</article>
					</div>
				</section>
			</div>

			<p className={styles.note}>
				Use it for mounted components, <code>display: none</code> entry, dialogs, and popovers.
			</p>
		</div>
	);
}
