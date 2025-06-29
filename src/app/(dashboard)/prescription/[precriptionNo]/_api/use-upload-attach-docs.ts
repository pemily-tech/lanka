import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../services/http-service';
import { type IApiResponse } from '../../../../../types/common';

import { AppConstants } from '@/helpers/primitives';

const uploadAttachDocs = async (payload: FormData, id: string) => {
	const { data } = await HttpService.patch<
		IApiResponse<{ prescription: string }>
	>(`prescription/attachDocuments/${id}`, payload, {
		headers: {
			'Content-Type': 'multipart/form-data',
			'cache-control': 'no-cache',
		},
	});
	return data;
};

export const useUploadAttachDocs = (id: string) => {
	return useMutation({
		mutationFn: (payload: FormData) => uploadAttachDocs(payload, id),
		onSuccess: (data) => {
			if (data?.status === AppConstants.Success) {
				toast.success('Document uploaded Successfully!');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
};
