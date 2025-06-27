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
	active: boolean;
}

const updateAddress = async (payload: IPayload, addressId: string) => {
	const { data } = await HttpService.patch<
		IApiResponse<{ address: IAddress }>
	>(`address/${addressId}`, payload);
	return data;
};

export const useUpdateAddress = (addressId: string) => {
	return useMutation({
		mutationFn: (payload: IPayload) => updateAddress(payload, addressId),
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
