import { Download, Trash2 } from 'lucide-react';
import Link from 'next/link';

import { useUpdateMedicalRecord } from '../_api/use-update-medical-record';

import { AppConstants } from '@/helpers/primitives';
import useDocumentDownload from '@/hooks/use-download-document';
import { queryClient } from '@/services/providers';
import { type IMedicalRecord } from '@/types/clinic';
import { type IMedicalRecordFilter } from '@/types/common';
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
import { Loader } from '@/ui/loader';

export default function Actions({
	record,
	type,
	date,
	petId,
}: {
	record: IMedicalRecord;
	type: IMedicalRecordFilter;
	date?: string | undefined;
	petId?: string | undefined;
}) {
	const { mutateAsync: updateMedicalRecord, isPending } =
		useUpdateMedicalRecord({ id: record?._id });
	const { url, isPending: isLoading } = useDocumentDownload(record?.url);

	const handelRemove = async () => {
		const payload = {
			type,
			active: false,
		};
		const response = await updateMedicalRecord(payload);
		if (response.status === AppConstants.Success) {
			queryClient.invalidateQueries({
				queryKey: ['clinic/medicalRecords', type, petId, date],
			});
		}
	};

	return (
		<div className="flex items-center justify-end gap-2">
			<Link target="_blank" href={url ?? ''}>
				<Button
					data-umami-event="medical_record_download"
					data-umami-event-id={record._id}
					size="icon"
					variant="ghost"
					className="p-1"
				>
					{isLoading ? (
						<Loader />
					) : (
						<Download className="size-full" />
					)}
				</Button>
			</Link>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						disabled={!record.active || isPending}
						size="icon"
						variant="ghost"
						data-umami-event="medical_record_delete"
						data-umami-event-id={record._id}
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
							onClick={handelRemove}
							className="px-6 font-normal"
							data-umami-event="medical_record_confirm"
							data-umami-event-id={record._id}
						>
							Confirm
						</AlertDialogAction>
						<AlertDialogCancel className="px-4">
							<span className="text-sm font-normal">Cancel</span>
						</AlertDialogCancel>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
