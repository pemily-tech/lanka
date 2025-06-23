import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AppConstants } from '@/helpers/primitives';
import { HttpService } from '@/services/http-service';
import { type IApiResponse } from '@/types/common';
import { type ICertificate } from '@/types/health-certificate';

interface IPayload {
	parentId: string;
	patientId: string;
	type: string;
}

const createCertificate = async (payload: IPayload) => {
	const { data } = await HttpService.post<
		IApiResponse<{ certificate: ICertificate }>
	>(`certificate/create`, payload);
	return data;
};

export const useCreateCertificate = () => {
	return useMutation({
		mutationFn: (payload: IPayload) => createCertificate(payload),
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
