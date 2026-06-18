'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import styles from './container-style-queries-demo.module.css';

type Tone = 'calm' | 'urgent' | 'fresh';
type Density = 'comfortable' | 'compact';

const tones: Tone[] = ['calm', 'urgent', 'fresh'];
const densities: Density[] = ['comfortable', 'compact'];

const toneLabels: Record<Tone, string> = {
	calm: 'Calm',
	urgent: 'Urgent',
	fresh: 'Fresh',
};

const densityLabels: Record<Density, string> = {
	comfortable: 'Comfortable',
	compact: 'Compact',
};

function detectContainerStyleQueries() {
	const id = `style-query-probe-${Math.random().toString(36).slice(2)}`;
	const style = document.createElement('style');
	const container = document.createElement('div');
	const child = document.createElement('div');

	container.style.cssText =
		'--style-query-probe: active; position: absolute; inline-size: 0; block-size: 0; overflow: hidden;';
	child.id = id;
	style.textContent = `@container style(--style-query-probe: active) { #${id} { color: rgb(1, 2, 3); } }`;

	document.head.appendChild(style);
	container.appendChild(child);
	document.body.appendChild(container);

	const supported = getComputedStyle(child).color === 'rgb(1, 2, 3)';

	style.remove();
	container.remove();

	return supported;
}

export function ContainerStyleQueriesDemo() {
	const [tone, setTone] = useState<Tone>('calm');
	const [density, setDensity] = useState<Density>('comfortable');
	const [styleQuerySupport, setStyleQuerySupport] = useState<'checking' | 'supported' | 'unsupported'>('checking');

	useEffect(() => {
		setStyleQuerySupport(detectContainerStyleQueries() ? 'supported' : 'unsupported');
	}, []);

	return (
		<div className={styles.root} data-style-query-support={styleQuerySupport}>
			<header className={styles.toolbar}>
				<div className={styles.controlGroup} role="group" aria-label="Tone">
					<span className={styles.controlLabel}>--card-tone</span>
					<div className={styles.segment}>
						{tones.map((item) => (
							<button
								key={item}
								type="button"
								className={`${styles.segmentButton} ${tone === item ? styles.segmentButtonActive : ''}`}
								aria-pressed={tone === item}
								onClick={() => setTone(item)}
							>
								{toneLabels[item]}
							</button>
						))}
					</div>
				</div>

				<div className={styles.controlGroup} role="group" aria-label="Density">
					<span className={styles.controlLabel}>--card-density</span>
					<div className={styles.segment}>
						{densities.map((item) => (
							<button
								key={item}
								type="button"
								className={`${styles.segmentButton} ${density === item ? styles.segmentButtonActive : ''}`}
								aria-pressed={density === item}
								onClick={() => setDensity(item)}
							>
								{densityLabels[item]}
							</button>
						))}
					</div>
				</div>
			</header>

			<section
				className={styles.context}
				style={{ '--card-tone': tone, '--card-density': density } as CSSProperties}
				data-card-tone={tone}
				data-card-density={density}
				aria-label="Card context"
			>
				{styleQuerySupport === 'unsupported' ? (
					<p className={styles.supportNote}>
						This browser is updating the tokens, but not applying <code>@container style()</code> yet. A data-attribute
						fallback is active for the demo.
					</p>
				) : null}

				<div className={styles.contextHeader}>
					<div>
						<p className={styles.kicker}>Context wrapper</p>
						<h3>Release checkpoint</h3>
					</div>
					<code>
						--card-tone: {tone}; --card-density: {density};
					</code>
				</div>

				<div className={styles.deck}>
					<article className={styles.card}>
						<div className={styles.cardMain}>
							<span className={styles.chip}>Design system</span>
							<h4>Token pass</h4>
							<p>Parent context sets the tone. The card only reacts to the resolved custom property.</p>
						</div>
						<div className={styles.metricGrid} aria-label="Release metrics">
							<div>
								<strong>18</strong>
								<span>components</span>
							</div>
							<div>
								<strong>4</strong>
								<span>themes</span>
							</div>
							<div>
								<strong>2</strong>
								<span>densities</span>
							</div>
						</div>
					</article>

					<aside className={styles.timeline} aria-label="Release steps">
						<div>
							<span className={styles.dot} aria-hidden="true" />
							<p>Audit</p>
						</div>
						<div>
							<span className={styles.dot} aria-hidden="true" />
							<p>Patch</p>
						</div>
						<div>
							<span className={styles.dot} aria-hidden="true" />
							<p>Ship</p>
						</div>
					</aside>
				</div>
			</section>
		</div>
	);
}
