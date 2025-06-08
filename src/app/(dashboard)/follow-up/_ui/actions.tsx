import { Bell, Trash2 } from 'lucide-react';

import { useUpdateFollowUp } from '../_api/use-update-followup';
import { useUpdateNotification } from '../_api/use-update-notification';

import { AppConstants } from '@/helpers/primitives';
import { queryClient } from '@/services/providers';
import { type IFollowUpRecord } from '@/types/clinic';
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
	record: IFollowUpRecord;
	type: IOtherCommonFilter;
	date?: string | undefined;
	petId?: string | undefined;
}) {
	const { mutateAsync: updateNotification, isPending } =
		useUpdateNotification();
	const { mutateAsync: updateFollowup, isPending: isLoading } =
		useUpdateFollowUp();
	const disabled =
		record?.notificationCount >= 3 ||
		isPending ||
		isLoading ||
		typeof record?.followUpCompleteDate === 'string';

	const handelRemove = async (record: IFollowUpRecord) => {
		const payload = {
			id: record?._id,
			active: false,
		};
		const response = await updateFollowup(payload);
		if (response.status === AppConstants.Success) {
			queryClient.invalidateQueries({
				queryKey: ['clinic/followUpRecords', type, petId, date],
			});
		}
	};

	const handleNotifications = async (record: IFollowUpRecord) => {
		const payload = {
			parentMobile:
				typeof record?.parent.mobile === 'string'
					? Number(record?.parent.mobile)
					: record?.parent.mobile,
			petName: record?.pet?.name,
			clinicName: record?.clinic?.name,
			followUpDate: record?.followUpDate,
			followUpType: record?.followUpType,
			id: record?._id,
		};
		const response = await updateNotification(payload);
		if (response.status === AppConstants.Success) {
			queryClient.invalidateQueries({
				queryKey: ['clinic/followUpRecords', type, petId, date],
			});
		}
	};

	return (
		<div className="flex items-center gap-3">
			<Button
				data-umami-event="followup_notification"
				data-umami-event-id={record._id}
				size="icon"
				variant="ghost"
				disabled={disabled || isPending}
				onClick={() => handleNotifications(record)}
			>
				<Bell className="size-4" />
			</Button>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						disabled={!record.active || isLoading}
						size="icon"
						variant="ghost"
						data-umami-event="followup_delete"
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
							onClick={() => handelRemove(record)}
							className="px-6 font-normal"
							data-umami-event="followup_delete_confirm"
							data-umami-event-id={record._id}
						>
							Confirm
						</AlertDialogAction>
						<AlertDialogCancel className="px-6">
							<span className="text-sm font-normal">Cancel</span>
						</AlertDialogCancel>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
