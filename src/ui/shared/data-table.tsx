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
import Lottie from 'lottie-react';

import Loader from '../../../public/lottie/loader-dog.json';
import NothingFound from '../../../public/lottie/nothing-found.json';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './table';

interface IDataTableProps<TData> {
	data: TData[];
	columns: ColumnDef<TData, any>[];
	isPending: boolean;
	getRowId: (row: TData) => string;
	emptyMessage?: string;
}

export function DataTable<TData>({
	data,
	columns,
	isPending,
	getRowId,
	emptyMessage = 'Nothing found.',
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
							style={{ height: 320 }}
						>
							<Lottie
								style={{ height: 320 }}
								animationData={Loader}
							/>
						</TableCell>
					</TableRow>
				) : table.getRowModel().rows.length ? (
					table.getRowModel().rows.map((row) => (
						<Fragment key={row.id}>
							<TableRow>
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
							<Lottie
								style={{ height: 320 }}
								animationData={NothingFound}
							/>
							<span className="mt-12 block">{emptyMessage}</span>
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
