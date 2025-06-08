import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AppConstants } from '@/helpers/primitives';
import { HttpService } from '@/services/http-service';

interface IPayload {
	name: string;
	breed: string;
	gender: string;
	type: string;
	dob: string;
	parentId: string;
	microChipNo?: string;
}

const createPet = async (payload: IPayload) => {
	const { data } = await HttpService.post(`/pet`, payload);
	return data;
};

export function useCreatePet() {
	return useMutation({
		mutationFn: createPet,
		onSuccess: (data) => {
			if (data?.status === AppConstants.Success) {
				toast.success('Pet added Successfully!');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
