'use client';

import { useState } from 'react';
import styles from './text-box-trim-demo.module.css';

const trimOptions = ['none', 'trim-both', 'trim-start', 'trim-end'] as const;
const edgeOptions = [
	{ id: 'cap-alphabetic', value: 'cap alphabetic' },
	{ id: 'ex-alphabetic', value: 'ex alphabetic' },
	{ id: 'text-text', value: 'text text' },
] as const;

type Trim = (typeof trimOptions)[number];
type EdgeId = (typeof edgeOptions)[number]['id'];

const fonts = [
	{ id: 'grotesk', label: 'Space Grotesk', className: styles.fontGrotesk },
	{ id: 'serif', label: 'Instrument Serif', className: styles.fontSerif },
	{ id: 'mono', label: 'JetBrains Mono', className: styles.fontMono },
] as const;

export function TextBoxTrimDemo() {
	const [trim, setTrim] = useState<Trim>('trim-both');
	const [edge, setEdge] = useState<EdgeId>('cap-alphabetic');
	const edgeValue = edgeOptions.find((option) => option.id === edge)?.value ?? 'cap alphabetic';

	return (
		<div className={styles.root}>
			<header className={styles.header}>
				<div>
					<p className={styles.kicker}>Text box trimming</p>
					<h3>Padding that hugs the letters</h3>
				</div>
				<p className={styles.summary}>
					Every font ships with extra space above its capitals and below its baseline. The controls only change a data
					attribute. The CSS decides where each box starts and ends.
				</p>
			</header>

			<div className={styles.supportWrap}>
				<p className={`${styles.supportedNote} ${styles.supported}`}>
					Supported: the boxes below shrink to the glyphs when trimming is on, and the trimmed pills hug their letters.
				</p>
				<p className={`${styles.unsupportedNote} ${styles.unsupported}`}>
					This browser does not support <code>text-box-trim</code> yet. Every box keeps its font&rsquo;s built-in
					leading and the controls will not change anything.
				</p>
			</div>

			<section className={styles.samplesPanel} aria-labelledby="text-box-trim-samples-title">
				<div className={styles.sectionHead}>
					<div>
						<p className={styles.sectionLabel}>Three fonts, one rule</p>
						<h4 id="text-box-trim-samples-title">Same size, same line, different leading</h4>
					</div>
					<code>text-box: {trim === 'none' ? 'none' : `${trim} ${edgeValue}`}</code>
				</div>

				<div className={styles.controls}>
					<fieldset className={styles.control}>
						<legend>text-box-trim</legend>
						<div className={styles.segment}>
							{trimOptions.map((option) => (
								<button
									key={option}
									type="button"
									className={styles.button}
									aria-pressed={trim === option}
									onClick={() => setTrim(option)}
								>
									{option}
								</button>
							))}
						</div>
					</fieldset>
					<fieldset className={styles.control}>
						<legend>text-box-edge</legend>
						<div className={styles.segment}>
							{edgeOptions.map((option) => (
								<button
									key={option.id}
									type="button"
									className={styles.button}
									aria-pressed={edge === option.id}
									onClick={() => setEdge(option.id)}
									disabled={trim === 'none'}
								>
									{option.value}
								</button>
							))}
						</div>
					</fieldset>
				</div>

				<div className={styles.samples} data-trim={trim} data-edge={edge}>
					{fonts.map((font) => (
						<div key={font.id} className={styles.sampleCell}>
							<p className={`${styles.sample} ${font.className}`}>Hgx</p>
							<span className={styles.sampleLabel}>{font.label}</span>
						</div>
					))}
				</div>

				<p className={styles.panelNote}>
					The tinted box is each element&rsquo;s real content box with zero padding. The rules above and below are the
					edges of the row. With <code>trim-start cap</code> the tops of the capitals meet the top rule in all three
					fonts.
				</p>
			</section>

			<section className={styles.buttonsPanel} aria-labelledby="text-box-trim-buttons-title">
				<div className={styles.buttonsCopy}>
					<p className={styles.sectionLabel}>Buttons</p>
					<h4 id="text-box-trim-buttons-title">Equal padding, tighter pills</h4>
					<p>
						Both columns use <code>padding: 0.65rem 1rem</code>. Only the right column trims its label, so its padding
						starts at the cap height and ends at the baseline, and all three fonts land on the same pill height.
					</p>
				</div>

				<div className={styles.buttonColumns}>
					<div className={styles.buttonColumn}>
						<p className={styles.columnLabel}>Ordinary</p>
						{fonts.map((font) => (
							<button key={`plain-${font.id}`} type="button" className={`${styles.pill} ${font.className}`}>
								<span className={styles.dot} aria-hidden="true" />
								<span className={styles.pillLabel}>Deploy</span>
							</button>
						))}
					</div>
					<div className={`${styles.buttonColumn} ${styles.trimmedColumn}`}>
						<p className={styles.columnLabel}>text-box: trim-both cap alphabetic</p>
						{fonts.map((font) => (
							<button key={`trim-${font.id}`} type="button" className={`${styles.pill} ${font.className}`}>
								<span className={styles.dot} aria-hidden="true" />
								<span className={`${styles.pillLabel} ${styles.trimmedLabel}`}>Deploy</span>
							</button>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
