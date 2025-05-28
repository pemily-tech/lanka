import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '@/services/http-service';

interface IPayload {
	parentMobile: number;
	petName: string;
	clinicName: string;
	followUpDate: string;
	followUpType: string;
	id: string;
}

const updateNotification = async (payload: IPayload) => {
	const { id, ...rest } = payload;
	const { data } = await HttpService.patch(
		`/clinic/followUpReminderToParent/${id}`,
		rest
	);
	return data;
};

export function useUpdateNotification() {
	return useMutation({
		mutationFn: updateNotification,
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				toast.success('Updated Successfully!');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
