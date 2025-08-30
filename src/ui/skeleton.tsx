import { cn } from '@/helpers/utils';

function Skeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn('bg-neutral-400 animate-pulse rounded-md', className)}
			{...props}
		/>
	);
}

export { Skeleton };
