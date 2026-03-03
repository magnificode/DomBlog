'use client';

import { useState, useCallback } from 'react';

interface LabDemoProps {
	children: React.ReactNode;
	code?: string;
	codeLanguage?: string;
	slug: string;
}

export function LabDemo({ children, code, codeLanguage = 'css', slug }: LabDemoProps) {
	const [showCode, setShowCode] = useState(false);
	const [copied, setCopied] = useState(false);

	const copyLink = useCallback(() => {
		const url = `${window.location.origin}/lab/${slug}/`;
		navigator.clipboard.writeText(url).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	}, [slug]);

	return (
		<div className="lab-demo-wrapper">
			{/* Demo area — screenshot-ready */}
			<div className="lab-demo-stage">{children}</div>

			{/* Actions bar */}
			<div className="lab-demo-actions">
				{code ? (
					<button
						type="button"
						onClick={() => setShowCode((v) => !v)}
						className="lab-demo-btn"
						aria-expanded={showCode}
					>
						<span className="text-accent" aria-hidden="true">
							{showCode ? '−' : '+'}
						</span>{' '}
						{showCode ? 'Hide Code' : 'View Code'}
					</button>
				) : null}
				<button type="button" onClick={copyLink} className="lab-demo-btn">
					<span className="text-accent" aria-hidden="true">
						#
					</span>{' '}
					{copied ? 'Copied!' : 'Copy Link'}
				</button>
			</div>

			{/* Collapsible code block */}
			{showCode && code ? (
				<div className="lab-demo-code fade-in">
					<pre>
						<code className={`language-${codeLanguage}`}>{code}</code>
					</pre>
				</div>
			) : null}
		</div>
	);
}
