import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AppConstants } from '@/helpers/primitives';
import { HttpService } from '@/services/http-service';

interface IPayload {
	mobileNumber: string;
	name?: string;
}

const createParent = async (payload: IPayload) => {
	const { data } = await HttpService.patch(
		`/clinic/addParent/${payload?.mobileNumber}`,
		{ name: payload.name }
	);
	return data;
};

export function useCreateParent() {
	return useMutation({
		mutationFn: createParent,
		onSuccess: (data) => {
			if (data?.status === AppConstants.Success) {
				toast.success('Parent created Successfully!');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
