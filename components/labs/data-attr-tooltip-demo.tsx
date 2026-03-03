'use client';

import { useState } from 'react';
import styles from './data-attr-content-demo.module.css';

const tooltipSeeds = {
	edit: 'Edit this item',
	share: 'Share with your team',
	delete: 'Delete permanently',
} as const;

export function DataAttrTooltipDemo() {
	const [activeTooltip, setActiveTooltip] = useState<keyof typeof tooltipSeeds>('edit');
	const [tooltipMap, setTooltipMap] = useState(tooltipSeeds);

	return (
		<section className={styles.panel}>
			<div className={styles.tooltipRow}>
				<button type="button" className={`${styles.tooltip} ${styles.tooltipAction}`} data-tooltip={tooltipMap.edit}>
					Edit
				</button>
				<button type="button" className={`${styles.tooltip} ${styles.tooltipAction}`} data-tooltip={tooltipMap.share}>
					Share
				</button>
				<button type="button" className={`${styles.tooltip} ${styles.tooltipAction}`} data-tooltip={tooltipMap.delete}>
					Delete
				</button>
			</div>

			<div className={styles.controls}>
				<div className={styles.segment} role="radiogroup" aria-label="Select tooltip target">
					{(Object.keys(tooltipMap) as Array<keyof typeof tooltipMap>).map((key) => (
						<button
							key={key}
							type="button"
							className={`${styles.segmentBtn} ${activeTooltip === key ? styles.segmentBtnActive : ''}`}
							aria-pressed={activeTooltip === key}
							onClick={() => setActiveTooltip(key)}
						>
							{key}
						</button>
					))}
				</div>

				<label className={styles.field}>
					<span>Tooltip text</span>
					<input
						type="text"
						value={tooltipMap[activeTooltip]}
						onChange={(event) =>
							setTooltipMap((prev) => ({
								...prev,
								[activeTooltip]: event.target.value,
							}))
						}
						placeholder="Write tooltip copy"
					/>
				</label>
			</div>
		</section>
	);
}
