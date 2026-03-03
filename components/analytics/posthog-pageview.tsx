'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import posthogClient from 'posthog-js';

export function PostHogPageview(): null {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		if (!pathname) return;
		const query = searchParams?.toString();
		const fallbackUrl = query ? `${pathname}?${query}` : pathname;
		const url = typeof window !== 'undefined' ? window.location.href : fallbackUrl;

		posthogClient.capture('$pageview', { $current_url: url });
	}, [pathname, searchParams]);

	return null;
}
