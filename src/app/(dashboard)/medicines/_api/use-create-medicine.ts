import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../services/http-service';
import { type IApiResponse } from '../../../../types/common';
import { type IMedicine } from '../../../../types/prescription';

import { env } from '@/env.mjs';

interface IPayload {
	name: string;
	strength: string;
	interval: string;
	dose: string;
	frequency: string;
	duration: string;
	take: string;
	brand: string;
	diagnosis: string;
}

const createMedicine = async (payload: IPayload) => {
	try {
		const { data } = await HttpService.post<
			IApiResponse<{ medicine: IMedicine }>
		>(`${env.NEXT_PUBLIC_BASE_PATH}/medicine/create`, payload);
		return data;
	} catch (err) {
		console.error(err);
		throw new Error('Network Error');
	}
};

export const useCreateMedicine = () => {
	return useMutation({
		mutationFn: (payload: IPayload) => createMedicine(payload),
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
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
