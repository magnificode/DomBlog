'use client';

import { useState } from 'react';
import styles from './temporal-stage-4-demo.module.css';

interface DateRunResult {
	todayAfter: string;
	tomorrow: string;
	sameReference: boolean;
}

interface TemporalRunResult {
	todayAfter: string;
	tomorrow: string;
	sourceChanged: boolean;
}

function makeSeedDate() {
	const date = new Date();
	date.setHours(12, 0, 0, 0);
	return date;
}

function formatDateLabel(date: Date): string {
	return date.toLocaleDateString(undefined, {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
}

function toIsoDate(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}

function addIsoDays(iso: string, days: number): string {
	const [year, month, day] = iso.split('-').map(Number);
	const next = new Date(Date.UTC(year, month - 1, day + days));
	return next.toISOString().slice(0, 10);
}

export function TemporalStage4Demo() {
	const [seed, setSeed] = useState(() => makeSeedDate());
	const [dateRun, setDateRun] = useState<DateRunResult | null>(null);
	const [temporalRun, setTemporalRun] = useState<TemporalRunResult | null>(null);

	const seedLabel = formatDateLabel(seed);
	const seedIso = toIsoDate(seed);

	const runDateBug = () => {
		const today = new Date(seed.getTime());
		const addDay = (date: Date) => {
			date.setDate(date.getDate() + 1);
			return date;
		};
		const tomorrow = addDay(today);

		setDateRun({
			todayAfter: formatDateLabel(today),
			tomorrow: formatDateLabel(tomorrow),
			sameReference: today === tomorrow,
		});
	};

	const runTemporalVersion = () => {
		const today = seedIso;
		const tomorrow = addIsoDays(today, 1);

		setTemporalRun({
			todayAfter: today,
			tomorrow,
			sourceChanged: false,
		});
	};

	const reset = () => {
		setSeed(makeSeedDate());
		setDateRun(null);
		setTemporalRun(null);
	};

	return (
		<div className={styles.root}>
			<header className={styles.toolbar}>
				<p className={styles.toolbarCopy}>Same starting day. One mutable API. One immutable one.</p>
				<button type="button" className={styles.resetButton} onClick={reset}>
					Reset
				</button>
			</header>

			<div className={styles.grid}>
				<section className={styles.panel}>
					<header className={styles.panelHead}>
						<p className={`${styles.eyebrow} ${styles.eyebrowOld}`}>Old world</p>
						<h3 className={styles.title}>Date mutates the input</h3>
						<p className={styles.text}>Call a setter in some helper and the original value is gone.</p>
					</header>

					<div className={styles.console}>
						<div className={styles.line}>
							<span>Seed</span>
							<code>{seedLabel}</code>
						</div>
						<div className={styles.line}>
							<span>Tomorrow</span>
							<code>{dateRun?.tomorrow ?? 'click Run Date bug'}</code>
						</div>
						<div className={styles.line}>
							<span>Today after</span>
							<code>{dateRun?.todayAfter ?? seedLabel}</code>
						</div>
						<div className={styles.line}>
							<span>Same object</span>
							<code>{dateRun ? String(dateRun.sameReference) : 'not checked'}</code>
						</div>
					</div>

					<div className={styles.actions}>
						<button type="button" className={`${styles.runButton} ${styles.runButtonOld}`} onClick={runDateBug}>
							Run Date bug
						</button>
						<p className={styles.status}>
							{dateRun ? 'Today is now tomorrow. Oops.' : 'This is why Date helpers become landmines.'}
						</p>
					</div>
				</section>

				<section className={styles.panel}>
					<header className={styles.panelHead}>
						<p className={`${styles.eyebrow} ${styles.eyebrowNew}`}>New hotness</p>
						<h3 className={styles.title}>Temporal returns a new value</h3>
						<p className={styles.text}>Same date math, no mutation, no reference trap, no surprise.</p>
					</header>

					<div className={styles.console}>
						<div className={styles.line}>
							<span>Seed</span>
							<code>{seedIso}</code>
						</div>
						<div className={styles.line}>
							<span>Tomorrow</span>
							<code>{temporalRun?.tomorrow ?? 'click Run Temporal'}</code>
						</div>
						<div className={styles.line}>
							<span>Today after</span>
							<code>{temporalRun?.todayAfter ?? seedIso}</code>
						</div>
						<div className={styles.line}>
							<span>Source changed</span>
							<code>{temporalRun ? String(temporalRun.sourceChanged) : 'not checked'}</code>
						</div>
					</div>

					<div className={styles.actions}>
						<button
							type="button"
							className={`${styles.runButton} ${styles.runButtonNew}`}
							onClick={runTemporalVersion}
						>
							Run Temporal
						</button>
						<p className={styles.status}>
							{temporalRun ? 'Original stays put. New value comes back.' : 'This is the whole mood shift.'}
						</p>
					</div>
				</section>
			</div>

			<section className={styles.cleanup}>
				<p className={styles.cleanupTitle}>Dependency cleanup, eventually:</p>
				<div className={styles.cleanupList}>
					<code>npm uninstall moment</code>
					<code>npm uninstall date-fns</code>
					<code>npm uninstall luxon</code>
					<code>npm uninstall dayjs</code>
				</div>
			</section>
		</div>
	);
}
