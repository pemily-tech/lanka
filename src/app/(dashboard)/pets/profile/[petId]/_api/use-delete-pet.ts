import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AppConstants } from '@/helpers/primitives';
import { HttpService } from '@/services/http-service';
import { type IApiResponse } from '@/types/common';
import { type ICertificate } from '@/types/health-certificate';

const deletePet = async (petId: string) => {
	const { data } = await HttpService.patch<
		IApiResponse<{ certificate: ICertificate }>
	>(`pet/delete/${petId}`, {});
	return data;
};

export const useDeletePet = (petId: string) => {
	return useMutation({
		mutationFn: () => deletePet(petId),
		onSuccess: (data) => {
			if (data?.status === AppConstants.Success) {
				toast.success('Deleted Successfully!');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
};
