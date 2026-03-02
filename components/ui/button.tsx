import * as React from 'react';
import { cn } from '@/lib/utils';

function Button({ className, ...props }: React.ComponentProps<'button'>) {
	return (
		<button
			className={cn(
				'inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60',
				className
			)}
			{...props}
		/>
	);
}

export { Button };
