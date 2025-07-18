import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AppConstants } from '@/helpers/primitives';
import { HttpService } from '@/services/http-service';

interface IPayload {
	parentMobile: number;
	petName: string;
	clinicName: string;
	nextVaccinationDate: string;
	vaccineName: string;
	id: string;
}

const updateNotification = async (payload: IPayload) => {
	const { id, ...rest } = payload;
	const { data } = await HttpService.patch(
		`/clinic/vaccinationReminderToParent/${id}`,
		rest
	);
	return data;
};

export function useUpdateNotification() {
	return useMutation({
		mutationFn: updateNotification,
		onSuccess: (data) => {
			if (data?.status === AppConstants.Success) {
				toast.success('Notification sent Successfully!');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
