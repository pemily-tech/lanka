import { type ColumnDef } from '@tanstack/react-table';
import { Edit2, Trash2 } from 'lucide-react';

import { useItemStore } from '../../_context/use-items';
import UpdateItem from './update-item';

import { type IInvoice, type IItem } from '@/types/bills-items';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/ui/alert';
import { AlertDialogFooter, AlertDialogHeader } from '@/ui/alert';
import { Button } from '@/ui/button';
import { Dialog, DialogTrigger } from '@/ui/dialog';

const renderHeader = ({ title }: { title: string }) => {
	return (
		<span className="text-neutral-500 font-semibold">
			{title.toUpperCase()}
		</span>
	);
};

export function useColumns(invoice: IInvoice): ColumnDef<IItem>[] {
	const { removeItem, updateItem } = useItemStore();

	const handelRemove = (id: string) => {
		removeItem(id);
	};

	return [
		{
			accessorKey: 'itemId',
			header: () => renderHeader({ title: '#' }),
			cell: ({ row }) => (
				<div className="font-medium">#{row.index + 1}</div>
			),
		},
		{
			accessorKey: 'name',
			header: () => renderHeader({ title: 'item' }),
			cell: ({ row }) => (
				<span className="font-medium">{row.original.name}</span>
			),
		},
		{
			accessorKey: 'quantity',
			header: () => renderHeader({ title: 'quantity' }),
			cell: ({ row }) => (
				<span className="font-medium">{row.original.quantity}</span>
			),
		},
		{
			accessorKey: 'mrp',
			header: () => renderHeader({ title: 'mrp' }),
			cell: ({ row }) => (
				<span className="font-medium">
					&#8377;{Number(row.original.mrp ?? 0).toFixed(2)}
				</span>
			),
		},
		{
			accessorKey: 'discount',
			header: () => renderHeader({ title: 'discount' }),
			cell: ({ row }) => (
				<span className="font-medium">
					&#8377;{Number(row.original.discount ?? 0).toFixed(2)}
				</span>
			),
		},
		{
			accessorKey: 'price',
			header: () => renderHeader({ title: 'price' }),
			cell: ({ row }) => (
				<span className="font-medium">
					&#8377;{Number(row.original.price ?? 0).toFixed(2)}
				</span>
			),
		},
		{
			id: 'itemTotal',
			header: () => renderHeader({ title: 'Total' }),
			cell: ({ row }) => (
				<span className="font-medium">
					&#8377;
					{Number(row.original.price * row.original.quantity).toFixed(
						2
					)}
				</span>
			),
		},
		{
			id: 'buttons',
			header: () => renderHeader({ title: 'actions' }),
			cell: ({ row }) => (
				<div className="flex items-center gap-3">
					<Dialog>
						<DialogTrigger asChild>
							<Button
								size="icon"
								variant="ghost"
								data-umami-event="items_edit_button"
								data-umami-event-id={row.original.itemId}
								disabled={!!invoice.url}
							>
								<Edit2 className="size-4" />
							</Button>
						</DialogTrigger>
						<UpdateItem
							item={row.original}
							updateItem={updateItem}
						/>
					</Dialog>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button
								disabled={!row.original.active || !!invoice.url}
								size="icon"
								variant="ghost"
								data-umami-event="items_delete"
								data-umami-event-id={row.original.itemId}
							>
								<Trash2 className="text-orange-700 size-4" />
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
									variant="secondary"
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
