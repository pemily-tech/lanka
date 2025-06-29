import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AppConstants } from '@/helpers/primitives';
import { HttpService } from '@/services/http-service';
import { type IAddress, type IApiResponse } from '@/types/common';

interface IPayload {
	pincode: string;
	line1: string;
	line2: string;
	type: string;
	state: string;
	district: string;
	userId: string;
	isPrimary: boolean;
}

const createAddress = async (payload: IPayload) => {
	const { data } = await HttpService.post<
		IApiResponse<{ address: IAddress }>
	>(`address`, payload);
	return data;
};

export const useCreateAddress = () => {
	return useMutation({
		mutationFn: (payload: IPayload) => createAddress(payload),
		onSuccess: (data) => {
			if (data?.status === AppConstants.Success) {
				toast.success('Created Successfully!');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
};
