import { cn } from '@/lib/utils';

interface NoiseLayerProps {
	className?: string;
}

export function NoiseLayer({ className }: NoiseLayerProps) {
	return <div className={cn('noise-overlay pointer-events-none absolute inset-0', className)} aria-hidden="true" />;
}
