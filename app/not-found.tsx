import Link from 'next/link';

export default function NotFound() {
	return (
		<main className="mx-auto flex min-h-[60vh] max-w-3xl items-center px-5 py-16 sm:px-8">
			<div className="fade-in-up">
				<p className="text-sm text-accent">404</p>
				<h1 className="mt-3 text-2xl font-semibold tracking-tight">Page not found</h1>
				<p className="mt-4 max-w-md text-sm leading-relaxed text-dim">
					This route doesn&apos;t resolve. The page may have moved during a previous migration.
				</p>
				<div className="terminal-divider mt-6 max-w-[120px]" />
				<Link
					href="/"
					className="focus-ring mt-6 inline-flex items-center gap-1.5 rounded-sm text-sm text-accent transition-opacity hover:opacity-80"
				>
					<span aria-hidden="true">&larr;</span> return home
				</Link>
			</div>
		</main>
	);
}
