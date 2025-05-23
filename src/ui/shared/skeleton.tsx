import { cn } from '../../helpers/utils';

function Skeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn('bg-grey-text3 animate-pulse rounded-md', className)}
			{...props}
		/>
	);
}

export { Skeleton };
