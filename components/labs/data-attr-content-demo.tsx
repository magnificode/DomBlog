'use client';

import { useMemo, useState } from 'react';
import styles from './data-attr-content-demo.module.css';

type Status = 'todo' | 'in-progress' | 'done' | 'blocked';
type Priority = 'low' | 'medium' | 'high';

interface BoardCard {
	id: string;
	title: string;
	status: Status;
	priority: Priority;
}

const tooltipSeeds = {
	edit: 'Edit this item',
	share: 'Share with your team',
	delete: 'Delete permanently',
} as const;

const initialCards: BoardCard[] = [
	{ id: 'task-1', title: 'Ship color tokens', status: 'in-progress', priority: 'high' },
	{ id: 'task-2', title: 'Write migration note', status: 'todo', priority: 'medium' },
	{ id: 'task-3', title: 'Audit empty states', status: 'blocked', priority: 'low' },
	{ id: 'task-4', title: 'Record release clip', status: 'done', priority: 'medium' },
];

const statuses: Status[] = ['todo', 'in-progress', 'done', 'blocked'];
const priorities: Priority[] = ['low', 'medium', 'high'];

export function DataAttrContentDemo() {
	const [activeTooltip, setActiveTooltip] = useState<keyof typeof tooltipSeeds>('edit');
	const [tooltipMap, setTooltipMap] = useState(tooltipSeeds);
	const [cards, setCards] = useState<BoardCard[]>(initialCards);
	const [activeCardId, setActiveCardId] = useState(initialCards[0]?.id ?? '');

	const activeCard = useMemo(() => cards.find((card) => card.id === activeCardId) ?? cards[0], [cards, activeCardId]);

	const updateCard = (patch: Partial<Pick<BoardCard, 'status' | 'priority'>>) => {
		if (!activeCard) return;
		setCards((prev) => prev.map((card) => (card.id === activeCard.id ? { ...card, ...patch } : card)));
	};

	return (
		<div className={styles.root}>
			<section className={styles.panel}>
				<div className={styles.panelHead}>
					<h3 className={styles.title}>Part 1: Simple tooltip</h3>
					<p className={styles.text}>
						Hover any button. Tooltip text is read from its own <code>data-tooltip</code> attribute.
					</p>
				</div>

				<div className={styles.tooltipRow}>
					<button type="button" className={`${styles.tooltip} ${styles.tooltipAction}`} data-tooltip={tooltipMap.edit}>
						Edit
					</button>
					<button type="button" className={`${styles.tooltip} ${styles.tooltipAction}`} data-tooltip={tooltipMap.share}>
						Share
					</button>
					<button
						type="button"
						className={`${styles.tooltip} ${styles.tooltipAction}`}
						data-tooltip={tooltipMap.delete}
					>
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

			<section className={styles.panel}>
				<div className={styles.panelHead}>
					<h3 className={styles.title}>Part 2: Dynamic status board</h3>
					<p className={styles.text}>
						Cards expose <code>data-status</code> and <code>data-priority</code>. CSS badges read those values via{' '}
						<code>attr()</code>.
					</p>
				</div>

				<div className={styles.board}>
					{cards.map((card) => (
						<button
							key={card.id}
							type="button"
							className={`${styles.card} ${activeCard?.id === card.id ? styles.cardActive : ''}`}
							data-status={card.status}
							data-priority={card.priority}
							onClick={() => setActiveCardId(card.id)}
						>
							<h4>{card.title}</h4>
						</button>
					))}
				</div>

				<div className={styles.controls}>
					<div className={styles.field}>
						<span>Active card</span>
						<div className={styles.attrText}>
							<code>{activeCard?.title}</code>
						</div>
					</div>

					<div className={styles.field}>
						<span>data-status</span>
						<div className={styles.segment}>
							{statuses.map((status) => (
								<button
									key={status}
									type="button"
									className={`${styles.segmentBtn} ${activeCard?.status === status ? styles.segmentBtnActive : ''}`}
									aria-pressed={activeCard?.status === status}
									onClick={() => updateCard({ status })}
								>
									{status}
								</button>
							))}
						</div>
					</div>

					<div className={styles.field}>
						<span>data-priority</span>
						<div className={styles.segment}>
							{priorities.map((priority) => (
								<button
									key={priority}
									type="button"
									className={`${styles.segmentBtn} ${activeCard?.priority === priority ? styles.segmentBtnActive : ''}`}
									aria-pressed={activeCard?.priority === priority}
									onClick={() => updateCard({ priority })}
								>
									{priority}
								</button>
							))}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
