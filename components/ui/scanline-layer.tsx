import { cn } from '@/lib/utils';

interface ScanlineLayerProps {
	className?: string;
}

export function ScanlineLayer({ className }: ScanlineLayerProps) {
	return <div className={cn('scanline-overlay pointer-events-none absolute inset-0', className)} aria-hidden="true" />;
}
