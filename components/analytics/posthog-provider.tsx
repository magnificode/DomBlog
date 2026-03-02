'use client';

import { useEffect } from 'react';
import { Suspense } from 'react';
import posthogClient from 'posthog-js';
import { PostHogProvider as PostHogProviderClient } from 'posthog-js/react';
import { PostHogPageview } from '@/components/analytics/posthog-pageview';

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com';

let initialized = false;

export function PostHogProvider({ children }: Readonly<{ children: React.ReactNode }>) {
	useEffect(() => {
		if (initialized) return;
		if (!POSTHOG_KEY) return;

		posthogClient.init(POSTHOG_KEY, {
			api_host: POSTHOG_HOST,
			capture_pageview: false,
			capture_pageleave: true,
			loaded: (instance) => {
				instance.register({ posthog_project_id: '329425' });
			},
		});

		initialized = true;
	}, []);

	return (
		<PostHogProviderClient client={posthogClient}>
			<Suspense fallback={null}>
				<PostHogPageview />
			</Suspense>
			{children}
		</PostHogProviderClient>
	);
}

export { posthogClient as posthog };
