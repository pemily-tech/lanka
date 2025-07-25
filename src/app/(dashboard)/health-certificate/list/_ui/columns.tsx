import { type ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
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
import { useRemoveCertificate } from '../_api/use-remove-certificate';

import { AppConstants } from '@/helpers/primitives';
import { Routes } from '@/helpers/routes';
import { cn } from '@/helpers/utils';
import { type ICertificate } from '@/types/health-certificate';
import { Button } from '@/ui/button';

export function useColumns(
	invalidateQueries: () => void
): ColumnDef<ICertificate>[] {
	const { mutateAsync: removePrescription } = useRemoveCertificate();

	const handleDelete = async (certificateNo: string) => {
		const response = await removePrescription({
			id: certificateNo,
		});
		if (response.status === AppConstants.Success) {
			invalidateQueries();
		}
	};

	return [
		{
			accessorKey: 'certificateNo',
			header: 'Certificate No',
			cell: ({ row }) => (
				<Link
					className="hover:text-purple hover:underline py-2"
					href={`${Routes.HEALTH_CERTIFICATE_EDIT_ITEM}/${row.original.certificateNo}`}
				>
					{row.original.certificateNo}
				</Link>
			),
		},
		{
			accessorKey: 'certificateDate',
			header: 'Date',
			cell: ({ row }) => (
				<span>
					{row.original.certificateDate &&
						format(row.original.certificateDate, 'do MMM, yyyy')}
				</span>
			),
		},
		{
			accessorKey: 'parentName',
			header: 'Parent Name',
			cell: ({ row }) => <span>{row.original.parentName}</span>,
		},
		{
			accessorKey: 'patientName',
			header: 'Patient Name',
			cell: ({ row }) => <span>{row.original.patientName}</span>,
		},
		{
			accessorKey: 'active',
			header: 'Active',
			cell: ({ row }) => (
				<div
					className={cn(
						row.original.active ? 'bg-primary' : 'bg-orange-700',
						'inline-flex rounded-full px-3 py-1 !text-xs text-white'
					)}
				>
					{row.original.active ? 'Active' : 'InActive'}
				</div>
			),
		},
		{
			id: 'buttons',
			header: 'Actions',
			cell: ({ row }) => {
				return (
					<div className="flex items-center gap-3">
						<Button
							disabled={!row.original.active}
							size="icon"
							variant="ghost"
						>
							<Link
								href={`${Routes.HEALTH_CERTIFICATE_EDIT_ITEM}/${row.original.certificateNo}`}
								className="flex size-6 items-center justify-center"
							>
								<Edit2 className="size-4" />
							</Link>
						</Button>
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
									<AlertDialogCancel
										variant="secondary"
										className=""
									>
										<span className="px-6 text-sm">
											Cancel
										</span>
									</AlertDialogCancel>
									<AlertDialogAction
										onClick={() =>
											handleDelete(
												row.original.certificateNo
											)
										}
										variant="ghost"
										className="px-6 font-semibold"
									>
										Confirm
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				);
			},
		},
	];
}
