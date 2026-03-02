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
		const url = query ? `${pathname}?${query}` : pathname;

		posthogClient.capture('$pageview', { $current_url: url });
	}, [pathname, searchParams]);

	return null;
}
