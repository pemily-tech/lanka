import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '@/services/http-service';
import { queryClient } from '@/services/providers';

const updatePetImage = async (payload: FormData, petId: string) => {
	const { data } = await HttpService.patch(
		`/pet/uploadProfile/${petId}`,
		payload,
		{
			headers: {
				'Content-Type': 'multipart/form-data',
				'cache-control': 'no-cache',
			},
		}
	);
	return data;
};

export function useUpdatePetImage(petId: string) {
	return useMutation({
		mutationFn: (payload: FormData) => updatePetImage(payload, petId),
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				toast.success('Updated Successfully!');
				queryClient.invalidateQueries({
					queryKey: ['pet/profileUrl', petId],
				});
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
