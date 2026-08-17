import styles from './field-sizing-demo.module.css';

const starterText = `Paste a few lines here.
The control keeps this fixed height,
so longer notes scroll inside it.`;

export function FieldSizingDemo() {
	return (
		<div className={styles.root}>
			<header className={styles.header}>
				<div>
					<p className={styles.kicker}>Native form controls</p>
					<h3>Let the field follow its content</h3>
				</div>
				<p className={styles.summary}>
					Type or paste into the controls. There are no input listeners, measurements, mirrors, or React state here.
				</p>
			</header>

			<div className={styles.supportWrap}>
				<p className={`${styles.supportedNote} ${styles.supported}`}>
					Supported: the content-sized textarea and the subject input are sizing from their content with CSS.
				</p>
				<p className={`${styles.unsupportedNote} ${styles.unsupported}`}>
					This browser does not support <code>field-sizing: content</code> yet. The fields keep their ordinary fixed
					sizes and the textareas remain manually resizable.
				</p>
			</div>

			<section className={styles.comparison} aria-labelledby="field-sizing-comparison-title">
				<div className={styles.sectionHead}>
					<div>
						<p className={styles.sectionLabel}>Vertical sizing</p>
						<h4 id="field-sizing-comparison-title">Same content, different sizing rule</h4>
					</div>
					<code>min-block-size → max-block-size</code>
				</div>

				<div className={styles.comparisonGrid}>
					<article className={styles.fieldCard}>
						<div className={styles.cardHead}>
							<div>
								<span className={styles.cardIndex}>01</span>
								<h5>Fixed-height baseline</h5>
							</div>
							<span className={styles.badge}>ordinary textarea</span>
						</div>
						<label htmlFor="field-sizing-fixed">Project note (fixed height)</label>
						<textarea id="field-sizing-fixed" className={styles.fixedTextarea} defaultValue={starterText} />
						<p>Paste more text. The box stays put and its own scrollbar takes over.</p>
					</article>

					<article className={`${styles.fieldCard} ${styles.autoCard}`}>
						<div className={styles.cardHead}>
							<div>
								<span className={styles.cardIndex}>02</span>
								<h5>Content-sized field</h5>
							</div>
							<span className={`${styles.badge} ${styles.activeBadge}`}>CSS-driven</span>
						</div>
						<label htmlFor="field-sizing-auto">Project note (content-sized)</label>
						<textarea id="field-sizing-auto" className={styles.autoTextarea} defaultValue={starterText} />
						<p>
							The box grows from <code>4lh</code> to <code>10lh</code>, then scrolls.
						</p>
					</article>
				</div>
			</section>

			<section className={styles.inlineDemo} aria-labelledby="field-sizing-inline-title">
				<div className={styles.inlineCopy}>
					<p className={styles.sectionLabel}>Horizontal sizing</p>
					<h4 id="field-sizing-inline-title">A text input can follow its value too</h4>
					<p>Edit the subject. It grows until the edge of this panel, then the text scrolls inside the input.</p>
				</div>

				<div className={styles.inlineField}>
					<label htmlFor="field-sizing-subject">Subject</label>
					<div className={styles.inputStage}>
						<input
							id="field-sizing-subject"
							type="text"
							className={styles.growingInput}
							defaultValue="Ship the CSS, skip the script"
						/>
					</div>
					<p className={styles.constraintNote}>
						<code>min-inline-size: 10rem</code>
						<span aria-hidden="true">/</span>
						<code>max-inline-size: 100%</code>
					</p>
				</div>
			</section>
		</div>
	);
}
