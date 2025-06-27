import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AppConstants } from '@/helpers/primitives';
import { HttpService } from '@/services/http-service';
import { type IAddress, type IApiResponse } from '@/types/common';

export async function getPincode(pincode: string) {
	const { data } = await HttpService.get<IApiResponse<{ address: IAddress }>>(
		`/address/pincode/${pincode}`
	);
	return data;
}

export const usePincode = () => {
	return useMutation({
		mutationFn: (pincode: string) => getPincode(pincode),
		onSuccess: (data) => {
			if (data?.status !== AppConstants.Success) {
				toast.error('Unable to fetch pincode.');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
};
