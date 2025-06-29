import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../services/http-service';
import { type IApiResponse } from '../../../../types/common';
import { type IMedicine } from '../../../../types/prescription';

import { AppConstants } from '@/helpers/primitives';

interface IPayload {
	name: string;
	strength: string;
	interval: string;
	dose: string;
	frequency: string;
	duration: string;
	take: string;
	// brand: string;
	// diagnosis: string;
}

const createMedicine = async (payload: IPayload) => {
	const { data } = await HttpService.post<
		IApiResponse<{ medicine: IMedicine }>
	>(`/medicine/create`, payload);
	return data;
};

export const useCreateMedicine = () => {
	return useMutation({
		mutationFn: (payload: IPayload) => createMedicine(payload),
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
