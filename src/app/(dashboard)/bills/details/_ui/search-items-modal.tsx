/* eslint-disable indent */
import { Fragment } from 'react';
import { flexRender } from '@tanstack/react-table';

import { useSearchItems } from '../_hooks/use-search-items';
import SelectItems from './select';

import { Button } from '@/ui/button';
import { Command, CommandInput } from '@/ui/command';
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/ui/dialog';
import Spinner from '@/ui/spinner';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/ui/table';

export default function SearchItemsModal() {
	const {
		value,
		handleChange,
		type,
		setType,
		quantity,
		setQuantity,
		table,
		isPending,
		columns,
		selectedIds,
	} = useSearchItems();

	return (
		<DialogContent className="max-w-5xl gap-1">
			<DialogHeader>
				<DialogTitle>Select Items for Invoice</DialogTitle>
			</DialogHeader>
			<DialogDescription className="text-neutral-400">
				Choose one or more products or services to include in this
				invoice.
			</DialogDescription>
			<div className="mt-4">
				<div className="flex items-end gap-4 border-b border-neutral-300 pb-4">
					<Command className="max-w-[350px] rounded-lg border border-border">
						<CommandInput
							className=""
							placeholder="Search for items..."
							value={value}
							onValueChange={handleChange}
						/>
					</Command>
					<SelectItems
						type={type}
						setType={setType}
						quantity={quantity}
						setQuantity={setQuantity}
					/>
				</div>
				<div className="h-[400px] overflow-y-scroll relative">
					<Table>
						<TableHeader className="sticky top-0">
							{table.getHeaderGroups().map((group) => (
								<TableRow key={group.id}>
									{group.headers.map((header) => (
										<TableHead
											className="px-2 py-4 text-sm"
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
							{isPending ? (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="text-center"
									>
										<Spinner />
									</TableCell>
								</TableRow>
							) : table.getRowModel().rows.length ? (
								table.getRowModel().rows.map((row) => (
									<Fragment key={row.id}>
										<TableRow>
											{row
												.getVisibleCells()
												.map((cell) => (
													<TableCell
														className="text-sm py-3"
														key={cell.id}
													>
														{flexRender(
															cell.column
																.columnDef.cell,
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
										<span className="mt-12 block">
											No items found.
										</span>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			</div>
			<DialogFooter className="border-t border-neutral-300 pt-4 flex !justify-between items-center">
				<div className="text-neutral-600 font-semibold">
					{selectedIds.size > 0 &&
						`Selected Items: ${selectedIds.size}`}
				</div>
				<div className="gap-2 flex">
					<DialogClose asChild>
						<Button className="px-10" variant="outline">
							Cancel
						</Button>
					</DialogClose>
					<Button className="px-10" variant="secondary">
						Save
					</Button>
				</div>
			</DialogFooter>
		</DialogContent>
	);
}
