import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ApiEndpoints } from '../../helpers/primitives';
import { HttpService } from '../../services/http-service';
import { type IApiResponse } from '../../types/common';
import { type IAddressResponse } from '../../types/user';

import { env } from '@/env.mjs';

export async function getPincode(pincode: string) {
	try {
		const { data } = await HttpService.get<IApiResponse<IAddressResponse>>(
			`${env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.Pincode}/${pincode}`
		);
		return data;
	} catch (err) {
		console.error(err);
		throw new Error('Network Error');
	}
}

export const usePincode = () => {
	return useMutation({
		mutationFn: (pincode: string) => getPincode(pincode),
		onSuccess: (data) => {
			if (data?.status !== 'SUCCESS') {
				toast.error('Unable to fetch pincode.');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
};
