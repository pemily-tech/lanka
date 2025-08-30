import { type ColumnDef } from '@tanstack/react-table';
import { Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';

import { useRemoveInvoice } from '../_api/use-delete-invoice';

import { Routes } from '@/helpers/routes';
import { formatRupee } from '@/helpers/utils';
import { type IInvoice } from '@/types/bills-items';
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
} from '@/ui/alert';
import { Button } from '@/ui/button';

export function useColumns(): ColumnDef<IInvoice>[] {
	const { mutateAsync: removeInvoice } = useRemoveInvoice();

	const handleDelete = async (invoiceNo: string) => {
		await removeInvoice({
			id: invoiceNo,
			active: false,
		});
	};

	return [
		{
			accessorKey: 'invoiceNo',
			header: 'Invoice No',
			cell: ({ row }) => (
				<Link
					className="hover:text-purple hover:underline"
					href={`${Routes.BILLS_DETAILS}/${row.original.invoiceNo}`}
				>
					{row.original.invoiceNo}
				</Link>
			),
		},
		{
			accessorKey: 'billToName',
			header: 'BillTo',
			cell: ({ row }) => (
				<span>
					{row.original.billToName}({row.original.billToMobile})
				</span>
			),
		},
		{
			accessorKey: 'totalAmount',
			header: 'Total',
			cell: ({ row }) => (
				<span>{formatRupee(row.original.totalAmount)}</span>
			),
		},
		{
			accessorKey: 'paidAmount',
			header: 'Paid',
			cell: ({ row }) => (
				<span>{formatRupee(row.original.paidAmount)}</span>
			),
		},
		{
			accessorKey: 'dueAmount',
			header: 'Due',
			cell: ({ row }) => (
				<span>{formatRupee(row.original.dueAmount)}</span>
			),
		},
		{
			id: 'due',
			header: 'Status',
			cell: ({ row }) => (
				<div>
					{row.original.dueAmount >= 1 ? (
						<span className="bg-orange-700 px-4 text-white py-1 rounded-full text-sm font-semibold">
							DUE
						</span>
					) : (
						<span className="bg-emerald-800 px-4 text-white py-1 rounded-full text-sm font-semibold">
							PAID
						</span>
					)}
				</div>
			),
		},
		{
			id: 'buttons',
			header: '',
			cell: ({ row }) => {
				return (
					<div className="flex items-center gap-3">
						<Link
							href={`${Routes.BILLS_DETAILS}/${row.original.invoiceNo}`}
							className="flex size-6 items-center justify-center"
						>
							<Button size="icon" variant="ghost">
								<Edit2 className="size-4" />
							</Button>
						</Link>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									disabled={!row.original.active}
									size="icon"
									variant="ghost"
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
											handleDelete(row.original.invoiceNo)
										}
										className="px-6"
									>
										Confirm
									</AlertDialogAction>
									<AlertDialogCancel>
										<span className="px-6 text-sm">
											Cancel
										</span>
									</AlertDialogCancel>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				);
			},
		},
	];
}
