import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '@/services/http-service';

interface IPayload {
	petId: string;
	parentId: string;
	followUpType: string;
	followUpDates: string[];
}

const createFollowup = async (payload: IPayload) => {
	const { data } = await HttpService.post(`/clinic/addFollowUp`, payload);
	return data;
};

export function useCreateFollowUp() {
	return useMutation({
		mutationFn: createFollowup,
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
