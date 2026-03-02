import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ChromeFrameProps {
	children: ReactNode;
	className?: string;
}

export function ChromeFrame({ children, className }: ChromeFrameProps) {
	return <div className={cn('panel-metal relative overflow-hidden rounded-2xl p-6', className)}>{children}</div>;
}
