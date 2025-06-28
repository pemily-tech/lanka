import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AppConstants } from '@/helpers/primitives';
import { HttpService } from '@/services/http-service';
import { type IApiResponse } from '@/types/common';

const updateCertificate = async (id: string) => {
	const { data } = await HttpService.patch<
		IApiResponse<{ prescription: string }>
	>(`certificate/upload/${id}`, {});
	return data;
};

export const useUploadCertificate = (id: string) => {
	return useMutation({
		mutationFn: () => updateCertificate(id),
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
