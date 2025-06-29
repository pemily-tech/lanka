import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AppConstants } from '@/helpers/primitives';
import { HttpService } from '@/services/http-service';

interface IPayload {
	followUpCompleteDate?: string;
	repeatAfter?: string;
	active: boolean;
	id: string;
}

const updateFollowupRecord = async (payload: IPayload) => {
	const { id, ...rest } = payload;
	const { data } = await HttpService.patch(
		`/clinic/updateFollowUp/${id}`,
		rest
	);
	return data;
};

export function useUpdateFollowUp() {
	return useMutation({
		mutationFn: (payload: IPayload) => updateFollowupRecord(payload),
		onSuccess: (data) => {
			if (data?.status === AppConstants.Success) {
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
