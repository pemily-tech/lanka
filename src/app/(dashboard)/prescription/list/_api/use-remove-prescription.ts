import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../services/http-service';
import { type IApiResponse } from '../../../../../types/common';
import { type IPrescription } from '../../../../../types/prescription';

const removePrescription = async (payload: { id: string }) => {
	const { id } = payload;
	try {
		const { data } = await HttpService.patch<
			IApiResponse<{ prescription: IPrescription }>
		>(`/prescription/remove/${id}`);
		return data;
	} catch (err) {
		throw new Error('Network Error');
	}
};

export const useRemovePrescription = () => {
	return useMutation({
		mutationFn: (payload: { id: string }) => removePrescription(payload),
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
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
