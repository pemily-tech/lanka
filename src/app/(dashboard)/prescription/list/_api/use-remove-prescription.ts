import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../services/http-service';
import { type IApiResponse } from '../../../../../types/common';
import { type IPrescription } from '../../../../../types/prescription';

import { AppConstants } from '@/helpers/primitives';

const removePrescription = async (payload: { id: string }) => {
	const { id } = payload;
	const { data } = await HttpService.patch<
		IApiResponse<{ prescription: IPrescription }>
	>(`/prescription/remove/${id}`);
	return data;
};

export const useRemovePrescription = () => {
	return useMutation({
		mutationFn: (payload: { id: string }) => removePrescription(payload),
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
