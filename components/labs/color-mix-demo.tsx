'use client';

import { useState, type CSSProperties } from 'react';
import styles from './color-mix-demo.module.css';

const basicMixes = [
	{
		label: '10% white',
		mix: 10,
		code: 'color-mix(in oklch, var(--brand) 90%, white)',
	},
	{
		label: '30% white',
		mix: 30,
		code: 'color-mix(in oklch, var(--brand) 70%, white)',
	},
	{
		label: '50% white',
		mix: 50,
		code: 'color-mix(in oklch, var(--brand) 50%, white)',
	},
] as const;

export function ColorMixDemo() {
	const [brand, setBrand] = useState('#38d97f');
	const [surfaceMode, setSurfaceMode] = useState<'light' | 'dark'>('light');

	const surfaceCode =
		surfaceMode === 'light'
			? 'color-mix(in oklch, var(--brand) 76%, white)'
			: 'color-mix(in oklch, var(--brand) 76%, black)';

	return (
		<div className={styles.root} style={{ '--brand': brand } as CSSProperties}>
			<header className={styles.toolbar}>
				<label className={styles.colorField}>
					<span>Brand color</span>
					<input
						type="color"
						value={brand}
						onChange={(event) => setBrand(event.target.value)}
						aria-label="Pick brand color"
					/>
					<code>{brand.toUpperCase()}</code>
				</label>
				<p className={styles.toolbarCopy}>One custom property. All states and tints.</p>
			</header>

			<section className={styles.panel}>
				<div className={styles.panelHead}>
					<h3 className={styles.title}>Basic mix</h3>
					<p className={styles.text}>White mixes at 10%, 30%, and 50% from the same brand source.</p>
				</div>
				<div className={styles.swatchGrid}>
					{basicMixes.map((mix) => (
						<article key={mix.mix} className={styles.swatchCard}>
							<div className={styles.swatch} data-mix={mix.mix} />
							<p className={styles.swatchLabel}>{mix.label}</p>
							<p className={styles.inlineCode}>
								<code>{mix.code}</code>
							</p>
						</article>
					))}
				</div>
			</section>

			<section className={styles.panel}>
				<div className={styles.panelHead}>
					<h3 className={styles.title}>Button hover states</h3>
					<p className={styles.text}>
						Default, hover, active, and disabled all come from <code>--brand</code>.
					</p>
				</div>
				<div className={styles.buttonRow}>
					<button type="button" className={styles.brandButton}>
						Hover me
					</button>
					<button type="button" className={styles.brandButton} disabled>
						Disabled
					</button>
				</div>
				<p className={styles.note}>Press and hold to preview the active state.</p>
			</section>

			<section className={styles.panel}>
				<div className={styles.panelHead}>
					<h3 className={styles.title}>Dark mode tinting</h3>
					<p className={styles.text}>Flip the surface. Light mode mixes toward white, dark mode mixes toward black.</p>
				</div>

				<div className={styles.segment} role="radiogroup" aria-label="Select tint surface">
					<button
						type="button"
						className={`${styles.segmentBtn} ${surfaceMode === 'light' ? styles.segmentBtnActive : ''}`}
						aria-pressed={surfaceMode === 'light'}
						onClick={() => setSurfaceMode('light')}
					>
						Light
					</button>
					<button
						type="button"
						className={`${styles.segmentBtn} ${surfaceMode === 'dark' ? styles.segmentBtnActive : ''}`}
						aria-pressed={surfaceMode === 'dark'}
						onClick={() => setSurfaceMode('dark')}
					>
						Dark
					</button>
				</div>

				<div className={styles.surface} data-mode={surfaceMode}>
					<div className={styles.surfaceSwatches}>
						<div className={styles.surfaceSwatch}>
							<p>Base</p>
							<div className={styles.baseChip} />
						</div>
						<div className={styles.surfaceSwatch}>
							<p>Tinted</p>
							<div className={styles.tintChip} />
						</div>
					</div>
					<p className={styles.inlineCode}>
						<code>{surfaceCode}</code>
					</p>
				</div>
			</section>
		</div>
	);
}
