/* eslint-disable indent */
'use client';

import { Fragment, useState } from 'react';
import {
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	useReactTable,
	type VisibilityState,
} from '@tanstack/react-table';

import { type IMedicine } from '../../../../../types/prescription';
import {
	Spinner,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../../../../../ui/shared';
import { useColumns } from './columns';

export default function Listing({
	data,
	isPending,
}: {
	data: IMedicine[];
	isPending: boolean;
}) {
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
		{}
	);
	const columns = useColumns();

	const table = useReactTable({
		data: data as IMedicine[],
		columns,
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getRowCanExpand: () => true,
		onColumnVisibilityChange: setColumnVisibility,
		getRowId: (row) => row._id,
		state: {
			columnVisibility,
		},
		manualPagination: true,
	});

	return (
		<Table>
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<TableHead className="text-14 p-16" key={header.id}>
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
				{isPending ? (
					<TableRow>
						<TableCell
							colSpan={columns.length}
							className="text-center"
						>
							<Spinner />
							<span>Fetching new results...</span>
						</TableCell>
					</TableRow>
				) : table.getRowModel().rows.length ? (
					table.getRowModel().rows.map((row) => (
						<Fragment key={row.id}>
							<TableRow key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<TableCell
										className="text-14"
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
							No results found.
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
