'use client';

import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

const STORAGE_KEY = 'dm-theme';

function setTheme(theme: Theme) {
	document.documentElement.dataset.theme = theme;
}

export function ThemeToggle() {
	const [theme, setThemeState] = useState<Theme>('dark');

	useEffect(() => {
		const stored = window.localStorage.getItem(STORAGE_KEY);
		if (stored === 'light' || stored === 'dark') {
			setThemeState(stored);
			setTheme(stored);
			return;
		}

		const preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
		setThemeState(preferred);
		setTheme(preferred);
	}, []);

	function toggleTheme() {
		const next: Theme = theme === 'dark' ? 'light' : 'dark';
		setThemeState(next);
		setTheme(next);
		window.localStorage.setItem(STORAGE_KEY, next);
	}

	return (
		<button
			type="button"
			onClick={toggleTheme}
			className="focus-ring rounded-sm text-[12px] text-dim transition-colors hover:text-foreground"
			aria-label="Toggle color theme"
		>
			[<span className="text-accent">{theme}</span>]
		</button>
	);
}
