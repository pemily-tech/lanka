import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../services/http-service';
import { type IApiResponse } from '../../../../../types/common';

import { AppConstants } from '@/helpers/primitives';

const updatePrescription = async (id: string) => {
	const { data } = await HttpService.patch<
		IApiResponse<{ prescription: string }>
	>(`prescription/upload/${id}`, {});
	return data;
};

export const useUploadPrescription = (id: string) => {
	return useMutation({
		mutationFn: () => updatePrescription(id),
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
};
