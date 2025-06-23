import { type ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react';

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
} from '../../../../../../ui/alert';

import { DATE_FORMAT } from '@/helpers/constant';
import { type IVaccine } from '@/types/health-certificate';
import { Button } from '@/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/ui/dialog';

export function useColumns(): ColumnDef<IVaccine>[] {
	return [
		{
			accessorKey: 'name',
			header: 'Name',
			cell: ({ row }) => <span>{row.original.name}</span>,
		},
		{
			accessorKey: 'brand',
			header: 'Brand',
			cell: ({ row }) => <span>{row.original.brand}</span>,
		},
		{
			accessorKey: 'batch',
			header: 'Batch',
			cell: ({ row }) => <span>{row.original.batch}</span>,
		},
		{
			accessorKey: 'givenOn',
			header: 'Given On',
			cell: ({ row }) => (
				<span>{format(row.original.givenOn, DATE_FORMAT)}</span>
			),
		},
		// {
		// 	id: 'buttons',
		// 	header: '',
		// 	cell: ({ row }) => {
		// 		if (isPrescriptionSaved) {
		// 			return null;
		// 		}
		// 		return (
		// 			<div className="flex items-center gap-3">
		// 				<Dialog>
		// 					<DialogTrigger asChild>
		// 						<Button size="icon" variant="ghost">
		// 							<Pencil className="size-4" />
		// 						</Button>
		// 					</DialogTrigger>
		// 					<DialogContent className="max-w-[720px]">
		// 						<DialogHeader className="border-b border-border">
		// 							<DialogTitle>Update Medicine</DialogTitle>
		// 							<DialogDescription></DialogDescription>
		// 						</DialogHeader>
		// 						<UpdateMedicine medicine={row.original} />
		// 					</DialogContent>
		// 				</Dialog>
		// 				<AlertDialog>
		// 					<AlertDialogTrigger asChild>
		// 						<Button size="icon" variant="ghost">
		// 							<Trash2 className="text-destructive size-4" />
		// 						</Button>
		// 					</AlertDialogTrigger>
		// 					<AlertDialogContent className="gap-6">
		// 						<AlertDialogHeader>
		// 							<AlertDialogTitle className="text-2xl">
		// 								Delete
		// 							</AlertDialogTitle>
		// 							<AlertDialogDescription>
		// 								Are you sure you want to delete?
		// 							</AlertDialogDescription>
		// 						</AlertDialogHeader>
		// 						<AlertDialogFooter className="!pt-2">
		// 							<AlertDialogAction
		// 								onClick={() =>
		// 									removeMedicine(
		// 										row.original.medicineId
		// 									)
		// 								}
		// 								className="px-6"
		// 							>
		// 								Confirm
		// 							</AlertDialogAction>
		// 							<AlertDialogCancel>
		// 								<span className="text-sm">Cancel</span>
		// 							</AlertDialogCancel>
		// 						</AlertDialogFooter>
		// 					</AlertDialogContent>
		// 				</AlertDialog>
		// 			</div>
		// 		);
		// 	},
		// },
	];
}
