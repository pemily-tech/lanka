import { cn } from '@/helpers/utils';

export function Loader({ className }: { className?: string }) {
	return (
		<div
			className={cn(
				'text-primary inline-block size-16 animate-spin rounded-full border-2 border-current border-t-transparent',
				className
			)}
			role="status"
			aria-label="loading"
		>
			<span className="sr-only">Loading...</span>
		</div>
	);
}
