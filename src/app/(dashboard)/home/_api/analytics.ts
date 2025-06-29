import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../services/http-service';

import { AppConstants } from '@/helpers/primitives';

interface IPayload {
	type: string;
	year: number;
	month: number;
}

const vaccinationExcel = async (payload: IPayload) => {
	const { data } = await HttpService.post(
		`/clinic/vaccinationDataInExcel`,
		payload
	);
	return data;
};

export function useVaccinationExcel() {
	return useMutation({
		mutationFn: vaccinationExcel,
		onSuccess: (data) => {
			if (
				data?.status === AppConstants.Success &&
				data?.data?.signedUrl
			) {
				toast.success('Data downloaded successfully!');
			} else if (
				data?.status === AppConstants.Success &&
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
