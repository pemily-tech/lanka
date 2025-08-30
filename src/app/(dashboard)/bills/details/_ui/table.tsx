/* eslint-disable indent */
'use client';

import { Fragment, useState } from 'react';
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	useReactTable,
	type VisibilityState,
} from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/ui/table';

export interface IDataTableProps<TData> {
	data: TData[];
	columns: ColumnDef<TData, any>[];
	getRowId: (row: any) => string;
}

export function ItemsTable<TData>({
	data,
	columns,
	getRowId,
}: IDataTableProps<TData>) {
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
		{}
	);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getRowCanExpand: () => true,
		onColumnVisibilityChange: setColumnVisibility,
		getRowId,
		state: {
			columnVisibility,
		},
		manualPagination: true,
	});

	return (
		<Table className="my-2">
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<TableHead
								className="px-3 py-4 text-sm"
								key={header.id}
							>
								{header.isPlaceholder
									? null
									: flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
							</TableHead>
						))}
					</TableRow>
				))}
			</TableHeader>
			<TableBody>
				{table.getRowModel().rows.length ? (
					table.getRowModel().rows.map((row) => (
						<Fragment key={row.id}>
							<TableRow>
								{row.getVisibleCells().map((cell) => (
									<TableCell
										className="text-sm"
										key={cell.id}
									>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
										)}
									</TableCell>
								))}
							</TableRow>
						</Fragment>
					))
				) : (
					<TableRow>
						<TableCell
							colSpan={columns.length}
							className="text-center"
						>
							<span className="mt-2 block"></span>
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
