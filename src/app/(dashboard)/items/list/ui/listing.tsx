'use client';

import { type ReactNode, useCallback, useMemo, useState } from 'react';
import {
	type PaginationState,
	type RowSelectionState,
} from '@tanstack/react-table';
import { useSearchParams } from 'next/navigation';

import { cn } from '../../../../../helpers/utils';
import { useGetProductsList } from '../api/use-get-items';
import { ProductListingContext } from '../context/context';

interface IProductListingProps {
	children: ReactNode;
	activeType: 'ACTIVE' | 'INACTIVE';
	apiKey: string;
	className?: string;
}

export function ProductListing({
	children,
	activeType,
	apiKey,
	className,
}: IProductListingProps) {
	const searchParams = useSearchParams();
	const page = searchParams.get('page');
	const [search, setSearchTerm] = useState<string>('');
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: Number(page) || 0,
		pageSize: 15,
	});
	const { data, isLoading, refetch } = useGetProductsList({
		searchTerm: search,
		apiKey,
		type: activeType,
		page: pagination.pageIndex,
		limit: pagination.pageSize,
	});
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

	const handleSearchChange = useCallback(
		(value: string) => {
			setSearchTerm(value);
			setPagination({
				...pagination,
				pageIndex: 0,
			});
		},
		[pagination]
	);

	const value = useMemo(
		() => ({
			value: search,
			handleSearchChange,
			data: data?.data?.items || [],
			isFetching: isLoading,
			rowSelection,
			setRowSelection,
			refetch,
			pagination,
			setPagination,
			apiKey,
			totalCount: data?.data?.totalCount || 0,
		}),
		[
			apiKey,
			data?.data?.items,
			data?.data?.totalCount,
			handleSearchChange,
			isLoading,
			pagination,
			refetch,
			rowSelection,
			search,
		]
	);

	return (
		<ProductListingContext.Provider value={value}>
			<div className={cn(className)}>{children}</div>
		</ProductListingContext.Provider>
	);
}
