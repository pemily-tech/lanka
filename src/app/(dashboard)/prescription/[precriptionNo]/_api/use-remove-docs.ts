import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../services/http-service';
import { type IApiResponse } from '../../../../../types/common';
import { type IPrescription } from '../../../../../types/prescription';

import { AppConstants } from '@/helpers/primitives';

interface IPayload {
	attachedDocumentId: string;
}

const removeAttachDoc = async (payload: IPayload, id: string) => {
	const { data } = await HttpService.patch<
		IApiResponse<{ prescription: IPrescription }>
	>(`prescription/removeAttachDocuments/${id}`, payload);
	return data;
};

export const useRemoveAttachDoc = (id: string) => {
	return useMutation({
		mutationFn: (payload: IPayload) => removeAttachDoc(payload, id),
		onSuccess: (data) => {
			if (data?.status === AppConstants.Success) {
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
