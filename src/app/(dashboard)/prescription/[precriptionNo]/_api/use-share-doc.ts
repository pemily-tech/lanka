import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../services/http-service';
import { type IApiResponse } from '../../../../../types/common';

import { AppConstants } from '@/helpers/primitives';

interface IPayload {
	attachedDocumentId?: string;
	type: string;
}

const shareDoc = async (payload: IPayload, id: string) => {
	const { data } = await HttpService.patch<
		IApiResponse<{ success: boolean }>
	>(`prescription/shareDocument/${id}`, payload);
	return data;
};

export const useShareDoc = (id: string) => {
	return useMutation({
		mutationFn: (payload: IPayload) => shareDoc(payload, id),
		onSuccess: (data) => {
			if (data?.status === AppConstants.Success) {
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
