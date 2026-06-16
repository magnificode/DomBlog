'use client';

import { useState, type CSSProperties } from 'react';
import styles from './contrast-color-demo.module.css';

const presets = [
	{ label: 'Violet', value: '#7c3aed', fg: '#ffffff' },
	{ label: 'Amber', value: '#f59e0b', fg: '#111827' },
	{ label: 'Lime', value: '#bef264', fg: '#111827' },
	{ label: 'Ink', value: '#111827', fg: '#ffffff' },
	{ label: 'Rose', value: '#e11d48', fg: '#ffffff' },
	{ label: 'Sky', value: '#38bdf8', fg: '#111827' },
] as const;

const statusTokens = [
	{ label: 'Ready', value: '#166534', fg: '#ffffff', detail: 'shipping' },
	{ label: 'Review', value: '#facc15', fg: '#111827', detail: 'queued' },
	{ label: 'Blocked', value: '#dc2626', fg: '#ffffff', detail: 'needs input' },
	{ label: 'Nightly', value: '#0f172a', fg: '#ffffff', detail: 'deploying' },
] as const;

export function ContrastColorDemo() {
	const [sample, setSample] = useState('#7c3aed');
	const selectedPreset = presets.find((preset) => preset.value.toLowerCase() === sample.toLowerCase());
	const selected = selectedPreset?.label ?? 'Custom';
	const sampleFallback = selectedPreset?.fg ?? '#ffffff';

	return (
		<div className={styles.root} style={{ '--sample': sample, '--sample-fg': sampleFallback } as CSSProperties}>
			<header className={styles.toolbar}>
				<label className={styles.colorField}>
					<span>Background</span>
					<input
						type="color"
						value={sample}
						onChange={(event) => setSample(event.target.value)}
						aria-label="Pick background color"
					/>
					<code>{sample.toUpperCase()}</code>
				</label>
				<p className={styles.toolbarCopy}>One color in. Black or white out.</p>
			</header>

			<section className={styles.preview} aria-label={`${selected} preview`}>
				<div>
					<p className={styles.kicker}>{selected}</p>
					<h3>Readable text from one background token.</h3>
					<p>Change the color and the foreground follows without JavaScript or paired theme variables.</p>
				</div>
				<span className={styles.previewChip}>color: contrast-color(var(--sample));</span>
			</section>

			<section className={styles.panel}>
				<div className={styles.panelHead}>
					<h3 className={styles.title}>Preset surfaces</h3>
					<p className={styles.text}>
						Each button uses its own background as the input to <code>contrast-color()</code>.
					</p>
				</div>
				<div className={styles.presetGrid}>
					{presets.map((preset) => (
						<button
							key={preset.value}
							type="button"
							className={styles.presetButton}
							style={{ '--preset': preset.value, '--preset-fg': preset.fg } as CSSProperties}
							aria-pressed={sample.toLowerCase() === preset.value.toLowerCase()}
							onClick={() => setSample(preset.value)}
						>
							<span>{preset.label}</span>
							<code>{preset.value}</code>
						</button>
					))}
				</div>
			</section>

			<section className={styles.panel}>
				<div className={styles.panelHead}>
					<h3 className={styles.title}>Status tokens</h3>
					<p className={styles.text}>Badges stay readable when the tone changes at runtime.</p>
				</div>
				<div className={styles.tokenGrid}>
					{statusTokens.map((token) => (
						<article
							key={token.label}
							className={styles.tokenCard}
							style={{ '--tone': token.value, '--tone-fg': token.fg } as CSSProperties}
						>
							<strong>{token.label}</strong>
							<span>{token.detail}</span>
						</article>
					))}
				</div>
			</section>
		</div>
	);
}
