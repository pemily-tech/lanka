import { Bell, Trash2 } from 'lucide-react';

import { useUpdateNotification } from '../_api/use-update-notification';
import { useUpdateVaccination } from '../_api/use-update-vaccination';

import { AppConstants } from '@/helpers/primitives';
import { queryClient } from '@/services/providers';
import { type IVaccinationRecord } from '@/types/clinic';
import { type IOtherCommonFilter } from '@/types/common';
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

export default function Actions({
	record,
	type,
	date,
	petId,
}: {
	record: IVaccinationRecord;
	type: IOtherCommonFilter;
	date?: string | undefined;
	petId?: string | undefined;
}) {
	const { mutateAsync: updateNotification, isPending } =
		useUpdateNotification();
	const { mutateAsync: updateVaccination, isPending: isLoading } =
		useUpdateVaccination();
	const disabled =
		record?.notificationCount >= 3 ||
		isPending ||
		isLoading ||
		typeof record?.vaccinatedOnDate === 'string';

	const handelRemove = async (record: IVaccinationRecord) => {
		const payload = {
			id: record?._id,
			active: false,
		};
		const response = await updateVaccination(payload);
		if (response.status === AppConstants.Success) {
			queryClient.invalidateQueries({
				queryKey: ['clinic/vaccinationRecords', type, petId, date],
			});
		}
	};

	const handleNotifications = async (record: IVaccinationRecord) => {
		const payload = {
			parentMobile:
				typeof record?.parent.mobile === 'string'
					? Number(record?.parent.mobile)
					: record?.parent.mobile,
			petName: record?.pet?.name,
			clinicName: record?.clinic?.name,
			nextVaccinationDate: record?.vaccinationDate,
			vaccineName: record?.vaccineName,
			id: record?._id,
		};
		const response = await updateNotification(payload);
		if (response.status === 'SUCCESS') {
			queryClient.invalidateQueries({
				queryKey: ['clinic/vaccinationRecords', type, petId, date],
			});
		}
	};

	return (
		<div className="flex items-center gap-12">
			<Button
				data-umami-event="followup_notification"
				data-umami-event-id={record._id}
				size="icon"
				variant="ghost"
				disabled={disabled || isPending}
				onClick={() => handleNotifications(record)}
			>
				<Bell className="size-18" />
			</Button>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						disabled={!record.active || isLoading}
						size="icon"
						variant="ghost"
						data-umami-event="vaccination_delete"
						data-umami-event-id={record._id}
					>
						<Trash2 className="size-18 text-destructive" />
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent className="gap-24">
					<AlertDialogHeader>
						<AlertDialogTitle className="text-24">
							Delete
						</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className="!pt-32">
						<AlertDialogAction
							onClick={() => handelRemove(record)}
							className="px-24 font-normal"
							data-umami-event="vaccination_delete_confirm"
							data-umami-event-id={record._id}
						>
							Confirm
						</AlertDialogAction>
						<AlertDialogCancel>
							<span className="text-14 font-normal">Cancel</span>
						</AlertDialogCancel>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
