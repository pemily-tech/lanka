'use client';

import { type ReactNode } from 'react';

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from './pagination';

import { cn } from '@/helpers/utils';

export interface PaginationWithLinksProps {
	totalCount: number;
	pageSize: number;
	page: number;
	handlePagination: (type: 'prev' | 'next' | number) => void;
	className?: string;
	limit: number;
}

export function PaginationWithLinks({
	pageSize,
	totalCount,
	page,
	handlePagination,
	className,
	limit,
}: PaginationWithLinksProps) {
	const totalPageCount = Math.ceil(totalCount / pageSize);

	const renderPageNumbers = () => {
		const items: ReactNode[] = [];
		const maxVisiblePages = 5;

		if (totalPageCount <= maxVisiblePages) {
			for (let i = 0; i < totalPageCount; i++) {
				// Adjusted to start at 0
				items.push(
					<PaginationItem key={i}>
						<PaginationLink
							onClick={() => handlePagination(i)}
							isActive={page === i}
						>
							{i + 1} {/* Display as 1-based for users */}
						</PaginationLink>
					</PaginationItem>
				);
			}
		} else {
			items.push(
				<PaginationItem key={0}>
					<PaginationLink
						onClick={() => handlePagination(0)}
						isActive={page === 0}
					>
						1 {/* Display as 1-based for users */}
					</PaginationLink>
				</PaginationItem>
			);

			if (page > 2) {
				items.push(
					<PaginationItem key="ellipsis-start">
						<PaginationEllipsis />
					</PaginationItem>
				);
			}

			const start = Math.max(1, page - 1);
			const end = Math.min(totalPageCount - 2, page + 1);

			for (let i = start; i <= end; i++) {
				items.push(
					<PaginationItem key={i}>
						<PaginationLink
							onClick={() => handlePagination(i)}
							isActive={page === i}
						>
							{i + 1} {/* Display as 1-based for users */}
						</PaginationLink>
					</PaginationItem>
				);
			}

			if (page < totalPageCount - 3) {
				items.push(
					<PaginationItem key="ellipsis-end">
						<PaginationEllipsis />
					</PaginationItem>
				);
			}

			items.push(
				<PaginationItem key={totalPageCount - 1}>
					<PaginationLink
						onClick={() => handlePagination(totalPageCount - 1)}
						isActive={page === totalPageCount - 1}
					>
						{totalPageCount} {/* Display as 1-based for users */}
					</PaginationLink>
				</PaginationItem>
			);
		}

		return items;
	};

	return (
		<div className="rounded-8 shadow-card1 flex items-center justify-between gap-24 bg-white px-16 py-8">
			<div className="flex-1">
				Showing Results: {page * Number(limit) + 1}-
				{Math.min((page + 1) * Number(limit), totalCount ?? 0)} of{' '}
				{totalCount}
			</div>
			<Pagination className={cn(className)}>
				<PaginationContent className="max-sm:gap-0">
					<PaginationItem>
						<PaginationPrevious
							onClick={() =>
								handlePagination(Math.max(page - 1, 0))
							}
							disabled={page === 0}
							className={
								page === 0
									? 'pointer-events-none opacity-50'
									: undefined
							}
						/>
					</PaginationItem>
					{renderPageNumbers()}
					<PaginationItem>
						<PaginationNext
							onClick={() =>
								handlePagination(
									Math.min(page + 1, totalPageCount - 1)
								)
							}
							disabled={page === totalPageCount - 1}
							className={
								page === totalPageCount - 1
									? 'pointer-events-none opacity-50'
									: undefined
							}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
