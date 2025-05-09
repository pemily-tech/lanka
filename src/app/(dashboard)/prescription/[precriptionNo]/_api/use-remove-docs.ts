import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../services/http-service';
import { type IApiResponse } from '../../../../../types/common';
import { type IPrescription } from '../../../../../types/prescription';

interface IPayload {
	attachedDocumentId: string;
}

const removeAttachDoc = async (payload: IPayload, id: string) => {
	try {
		const { data } = await HttpService.patch<
			IApiResponse<{ prescription: IPrescription }>
		>(`prescription/removeAttachDocuments/${id}`, payload);
		return data;
	} catch (err) {
		console.error(err);
		throw new Error('Network Error');
	}
};

export const useRemoveAttachDoc = (id: string) => {
	return useMutation({
		mutationFn: (payload: IPayload) => removeAttachDoc(payload, id),
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				toast.success('Document removed Successfully!');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
};
