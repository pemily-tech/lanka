import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AppConstants } from '@/helpers/primitives';
import { HttpService } from '@/services/http-service';
import { type IApiResponse } from '@/types/common';
import { type ICertificate } from '@/types/health-certificate';

const removeCertificate = async (payload: { id: string }) => {
	const { id } = payload;
	const { data } = await HttpService.patch<
		IApiResponse<{ certificate: ICertificate }>
	>(`/certificate/remove/${id}`);
	return data;
};

export const useRemoveCertificate = () => {
	return useMutation({
		mutationFn: (payload: { id: string }) => removeCertificate(payload),
		onSuccess: (data) => {
			if (data?.status === AppConstants.Success) {
				toast.success('Removed Successfully!');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
};
