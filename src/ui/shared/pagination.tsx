import * as React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

import { cn } from '../../helpers/utils';
import { Button, type ButtonProps } from './button';

export const Pagination = ({
	className,
	...props
}: React.ComponentProps<'nav'>) => (
	<nav
		role="navigation"
		aria-label="pagination"
		className={cn('mx-auto flex w-full justify-center', className)}
		{...props}
	/>
);
Pagination.displayName = 'Pagination';

export const PaginationContent = React.forwardRef<
	HTMLUListElement,
	React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
	<ul
		ref={ref}
		className={cn('flex flex-row items-center gap-12', className)}
		{...props}
	/>
));
PaginationContent.displayName = 'PaginationContent';

export const PaginationItem = React.forwardRef<
	HTMLLIElement,
	React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
	<li ref={ref} className={cn('', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
	isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
	React.ComponentProps<'button'>;

export const PaginationLink = ({
	className,
	isActive,
	size = 'icon',
	...props
}: PaginationLinkProps) => (
	<Button
		variant={isActive ? 'default' : 'ghost'}
		size={size}
		className={cn(
			className,
			'rounded-8 flex size-32 items-center justify-center gap-4 p-12'
		)}
		{...props}
	/>
);
PaginationLink.displayName = 'PaginationLink';

export const PaginationPrevious = ({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) => (
	<PaginationLink
		size="default"
		className={cn('rounded-8 !size-auto', className)}
		{...props}
	>
		<ChevronLeft className="size-16" />
		<span>Previous</span>
	</PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

export const PaginationNext = ({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) => (
	<PaginationLink
		size="default"
		className={cn('rounded-8 !size-auto', className)}
		{...props}
	>
		<span>Next</span>
		<ChevronRight className="size-16" />
	</PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

export const PaginationEllipsis = ({
	className,
	...props
}: React.ComponentProps<'span'>) => (
	<span
		aria-hidden
		className={cn('flex size-16 items-center justify-center', className)}
		{...props}
	>
		<MoreHorizontal className="size-16" />
		<span className="sr-only">More pages</span>
	</span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';
