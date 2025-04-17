/* eslint-disable indent */
/* eslint-disable max-lines-per-function */
import { useMemo } from 'react';
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import Link from 'next/link';

import { Routes } from '../../../../../helpers/routes';
import { cn } from '../../../../../helpers/utils';
import { type IProduct } from '../../../../../types/invoice';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from '../../../../../ui/shared/pagination';
import Spinner from '../../../../../ui/shared/spinner';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../../../../../ui/shared/table';
import { useProductListingContext } from '../context/context';

export default function Columns() {
	const { data, pagination, setPagination, isFetching } =
		useProductListingContext();
	const columns: ColumnDef<IProduct>[] = useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'Title',
				cell: ({ row }) => {
					return (
						<Link
							href={`${Routes.EDIT_ITEM}/${row.original.itemId}`}
							className="text-black-1 text-14 hover:underline"
						>
							{row.original.name}
						</Link>
					);
				},
				size: 200,
			},
			{
				accessorKey: 'price',
				header: 'Price',
				cell: ({ row }) => <div> &#8377;{row.getValue('price')}</div>,
			},
			{
				accessorKey: 'mrp',
				header: 'Mrp',
				cell: ({ row }) => <div> &#8377;{row.getValue('mrp')}</div>,
			},
			{
				accessorKey: 'discount',
				header: 'Discount',
				cell: ({ row }) => (
					<div> &#8377;{row.getValue('discount')}</div>
				),
			},
			{
				accessorKey: 'quantity',
				header: 'Quantity',
				cell: ({ row }) => <div>{row.getValue('quantity')}</div>,
			},
			{
				accessorKey: 'active',
				header: 'Status',
				cell: ({ row }) => {
					const status = row.getValue('active');
					return (
						<div
							className={cn(
								'!text-12 inline-block rounded-full px-12 py-4 !font-semibold',
								status
									? 'bg-primary text-white'
									: 'bg-red-1 text-white'
							)}
						>
							{status ? 'Active' : 'Inactive'}
						</div>
					);
				},
			},
		],
		[]
	);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		state: {
			pagination,
		},
		onPaginationChange: () => setPagination(pagination),
		manualPagination: true,
	});

	const handlePagination = (type: 'prev' | 'next' | number) => {
		if (type === 'prev') {
			setPagination({
				...pagination,
				pageIndex: pagination.pageIndex - 1,
			});
		} else if (type === 'next') {
			setPagination({
				...pagination,
				pageIndex: pagination.pageIndex + 1,
			});
		} else {
			setPagination({
				...pagination,
				pageIndex: type,
			});
		}
	};

	if (isFetching) {
		return (
			<div className="my-54">
				<Spinner />
			</div>
		);
	}

	return (
		<div>
			<div className="shadow-card1 rounded-8 bg-white">
				<Table>
					<TableHeader>
						{table?.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead
										className="text-14 p-16"
										key={header.id}
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef
														.header,
													header.getContext()
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table?.getRowModel()?.rows?.length ? (
							table?.getRowModel()?.rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											className="text-14 px-16"
											key={cell.id}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 py-24 text-center"
								>
									<span>No results found.</span>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="rounded-8 shadow-card1 mt-12 bg-white p-12">
				<Pagination className="flex justify-end">
					<PaginationContent className="max-sm:gap-0">
						<PaginationItem className="flex items-center">
							<PaginationPrevious
								onClick={() => handlePagination('prev')}
								disabled={pagination.pageIndex === 0}
								className={
									pagination.pageIndex === 0
										? 'pointer-events-none opacity-50'
										: undefined
								}
							/>
						</PaginationItem>
						<PaginationItem>
							<PaginationNext
								onClick={() => handlePagination('next')}
								disabled={data?.length < pagination.pageSize}
								className={
									data?.length < pagination.pageSize
										? 'pointer-events-none opacity-50'
										: undefined
								}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	);
}
