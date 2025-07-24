import { type ColumnDef } from '@tanstack/react-table';
import { Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../../../../../ui/alert';
import { useRemoveItem } from '../_api/use-delete-item';

import { type IItem } from '@/types/bills-items';
import { Button } from '@/ui/button';

export function useColumns(): ColumnDef<IItem>[] {
	const { mutate: removeItem } = useRemoveItem();

	const handelRemove = (id: string) => {
		removeItem({ id });
	};

	return [
		{
			accessorKey: 'itemId',
			header: 'ID',
			cell: ({ row }) => <div>{row.original.itemId}</div>,
		},
		{
			accessorKey: 'name',
			header: 'Name',
			cell: ({ row }) => <span>{row.original.name}</span>,
		},
		{
			accessorKey: 'price',
			header: 'Price',
			cell: ({ row }) => (
				<span>&#8377;{Math.floor(row.original.price)}</span>
			),
		},
		{
			accessorKey: 'mrp',
			header: 'Mrp',
			cell: ({ row }) => (
				<span>&#8377;{Math.floor(row.original.mrp)}</span>
			),
		},
		{
			accessorKey: 'quantity',
			header: 'Quantity',
			cell: ({ row }) => <span>{row.original.quantity}</span>,
		},
		{
			id: 'buttons',
			header: '',
			cell: ({ row }) => (
				<div className="flex items-center gap-3">
					<Link
						href="/"
						// href={`${Routes.EDIT_BILLS_ITEM}/${row.original.}`}
						className="flex size-6 items-center justify-center"
					>
						<Button
							size="icon"
							variant="ghost"
							data-umami-event="items_edit_button"
							data-umami-event-id={row.original.itemId}
						>
							<Edit2 className="size-4" />
						</Button>
					</Link>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button
								disabled={!row.original.active}
								size="icon"
								variant="ghost"
								data-umami-event="items_delete"
								data-umami-event-id={row.original.itemId}
							>
								<Trash2 className="text-destructive size-4" />
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent className="gap-6">
							<AlertDialogHeader>
								<AlertDialogTitle className="text-2xl">
									Delete
								</AlertDialogTitle>
								<AlertDialogDescription>
									Are you sure you want to delete?
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter className="!pt-2">
								<AlertDialogAction
									onClick={() =>
										handelRemove(row.original.itemId)
									}
									className="px-6"
								>
									Confirm
								</AlertDialogAction>
								<AlertDialogCancel className="px-6">
									<span className="text-sm">Cancel</span>
								</AlertDialogCancel>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			),
		},
	];
}
