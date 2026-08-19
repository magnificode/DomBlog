'use client';

import { useState } from 'react';
import styles from './sibling-index-demo.module.css';

const stagePool = [
	'Lint',
	'Typecheck',
	'Build',
	'Test',
	'Bundle',
	'Sign',
	'Deploy',
	'Verify',
	'Announce',
	'Celebrate',
] as const;

const cardPool = [
	{ rank: 'A', suit: '♠', red: false },
	{ rank: 'K', suit: '♥', red: true },
	{ rank: 'Q', suit: '♣', red: false },
	{ rank: 'J', suit: '♦', red: true },
	{ rank: '10', suit: '♠', red: false },
	{ rank: '9', suit: '♥', red: true },
	{ rank: '8', suit: '♣', red: false },
	{ rank: '7', suit: '♦', red: true },
	{ rank: '6', suit: '♠', red: false },
] as const;

export function SiblingIndexDemo() {
	const [stageCount, setStageCount] = useState(5);
	const [cardCount, setCardCount] = useState(5);
	const [entrance, setEntrance] = useState(0);

	return (
		<div className={styles.root}>
			<header className={styles.header}>
				<div>
					<p className={styles.kicker}>Tree counting functions</p>
					<h3>Every element knows where it stands</h3>
				</div>
				<p className={styles.summary}>
					Add and remove items. The stagger, the hues, the widths, and the fan are all computed in CSS from{' '}
					<code>sibling-index()</code> and <code>sibling-count()</code>. React only edits the DOM — there are no inline
					styles, numbered classes, or per-item scripts here.
				</p>
			</header>

			<div className={styles.supportWrap}>
				<p className={`${styles.supportedNote} ${styles.supported}`}>
					Supported: every color, width, delay, and angle below is derived from each element&rsquo;s live position in
					its parent.
				</p>
				<p className={`${styles.unsupportedNote} ${styles.unsupported}`}>
					This browser does not support <code>sibling-index()</code> yet. The rows keep a single accent color and full
					width, and the cards sit in a flat row.
				</p>
			</div>

			<section className={styles.stagesPanel} aria-labelledby="sibling-index-stages-title">
				<div className={styles.sectionHead}>
					<div>
						<p className={styles.sectionLabel}>Index &times; count</p>
						<h4 id="sibling-index-stages-title">One rule, every row knows its share</h4>
					</div>
					<code>calc(100% / sibling-count() * sibling-index())</code>
				</div>

				<div className={styles.toolbar}>
					<button
						type="button"
						className={styles.button}
						onClick={() => setStageCount((count) => Math.max(2, count - 1))}
						disabled={stageCount <= 2}
					>
						&minus; Remove stage
					</button>
					<button
						type="button"
						className={styles.button}
						onClick={() => setStageCount((count) => Math.min(stagePool.length, count + 1))}
						disabled={stageCount >= stagePool.length}
					>
						+ Add stage
					</button>
					<button type="button" className={styles.button} onClick={() => setEntrance((run) => run + 1)}>
						&#8635; Replay entrance
					</button>
				</div>

				<ol key={entrance} className={styles.stageList}>
					{stagePool.slice(0, stageCount).map((stage) => (
						<li key={stage} className={styles.stageItem}>
							<span className={styles.stageName}>{stage}</span>
						</li>
					))}
				</ol>

				<p className={styles.panelNote}>
					Change the count and watch every existing row glide to its new width and hue. The computed values change, so
					ordinary transitions animate the redistribution.
				</p>
			</section>

			<section className={styles.fanPanel} aria-labelledby="sibling-index-fan-title">
				<div className={styles.fanCopy}>
					<p className={styles.sectionLabel}>Symmetry from the midpoint</p>
					<h4 id="sibling-index-fan-title">A hand of cards that rebalances itself</h4>
					<p>
						Each card rotates away from <code>(sibling-count() + 1) / 2</code>. Deal or take a card and the whole fan
						re-centers.
					</p>
					<div className={styles.toolbar}>
						<button
							type="button"
							className={styles.button}
							onClick={() => setCardCount((count) => Math.max(1, count - 1))}
							disabled={cardCount <= 1}
						>
							&minus; Take a card
						</button>
						<button
							type="button"
							className={styles.button}
							onClick={() => setCardCount((count) => Math.min(cardPool.length, count + 1))}
							disabled={cardCount >= cardPool.length}
						>
							+ Deal a card
						</button>
					</div>
				</div>

				<ul className={styles.fan} aria-label="Fanned hand of playing cards">
					{cardPool.slice(0, cardCount).map((card) => (
						<li key={`${card.rank}${card.suit}`} className={`${styles.card} ${card.red ? styles.redCard : ''}`}>
							<span className={styles.cardRank}>{card.rank}</span>
							<span className={styles.cardSuit} aria-hidden="true">
								{card.suit}
							</span>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}
