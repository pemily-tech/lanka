import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../services/http-service';
import { type IApiResponse } from '../../../../../types/common';
import { type IPrescription } from '../../../../../types/prescription';

interface IPayload {
	attachedDocumentId?: string;
	type: string;
}

const shareDoc = async (payload: IPayload, id: string) => {
	try {
		const { data } = await HttpService.patch<
			IApiResponse<{ success: boolean }>
		>(`prescription/shareDocument/${id}`, payload);
		return data;
	} catch (err) {
		console.error(err);
		throw new Error('Network Error');
	}
};

export const useShareDoc = (id: string) => {
	return useMutation({
		mutationFn: (payload: IPayload) => shareDoc(payload, id),
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				toast.success('Document shared Successfully!');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
};
