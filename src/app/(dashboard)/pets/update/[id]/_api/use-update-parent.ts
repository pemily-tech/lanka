import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '@/services/http-service';

interface IPayload {
	name: string;
	breed: string;
	gender: string;
	type: string;
	dob: string;
	microChipNo?: string;
}

const updatePet = async (payload: IPayload, petId: string) => {
	const { data } = await HttpService.patch(`/pet/${petId}`, payload);
	return data;
};

export function useUpdatePet(petId: string) {
	return useMutation({
		mutationFn: (payload: IPayload) => updatePet(payload, petId),
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
