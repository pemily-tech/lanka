'use client';

import { type ReactNode, useCallback, useMemo, useState } from 'react';
import {
	type PaginationState,
	type RowSelectionState,
} from '@tanstack/react-table';
import { useSearchParams } from 'next/navigation';

import { cn } from '../../../../../helpers/utils';
import { useGetInvoicesList } from '../api/use-get-items';
import { InvoiceListingContext } from '../context/context';

interface IInvoiceListingProps {
	children: ReactNode;
	activeType: 'ACTIVE' | 'INACTIVE';
	apiKey: string;
	className?: string;
}

export function InvoiceListing({
	children,
	activeType,
	apiKey,
	className,
}: IInvoiceListingProps) {
	const searchParams = useSearchParams();
	const page = searchParams.get('page');
	const [search, setSearchTerm] = useState<string>('');
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: Number(page) || 0,
		pageSize: 15,
	});
	const { data, isLoading, refetch } = useGetInvoicesList({
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
			data: data?.data?.invoices || [],
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
			data?.data?.invoices,
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
		<InvoiceListingContext.Provider value={value}>
			<div className={cn(className)}>{children}</div>
		</InvoiceListingContext.Provider>
	);
}
