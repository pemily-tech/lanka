import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../services/http-service';

import { env } from '@/env.mjs';

interface IPayload {
	type: string;
	year: number;
	month: number;
}

const vaccinationExcel = async (payload: IPayload) => {
	try {
		const { data } = await HttpService.post(
			`${env.NEXT_PUBLIC_BASE_PATH}/clinic/vaccinationDataInExcel`,
			payload
		);
		return data;
	} catch (err) {
		console.error(err);
		throw new Error('Network Error');
	}
};

export function useVaccinationExcel() {
	return useMutation({
		mutationFn: vaccinationExcel,
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS' && data?.data?.signedUrl) {
				toast.success('Data Downloaded Successfully!');
			} else if (
				data?.status === 'SUCCESS' &&
				data?.data?.signedUrl === '' &&
				data?.data?.msg
			) {
				toast.success(data?.data?.msg);
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
