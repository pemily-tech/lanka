import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../services/http-service';
import { type IApiResponse } from '../../../../../types/common';

const uploadAttachDocs = async (payload: FormData, id: string) => {
	try {
		const { data } = await HttpService.patch<
			IApiResponse<{ prescription: string }>
		>(`prescription/attachDocuments/${id}`, payload, {
			headers: {
				'Content-Type': 'multipart/form-data',
				'cache-control': 'no-cache',
			},
		});
		return data;
	} catch (err) {
		console.error(err);
		throw new Error('Network Error');
	}
};

export const useUploadAttachDocs = (id: string) => {
	return useMutation({
		mutationFn: (payload: FormData) => uploadAttachDocs(payload, id),
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
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
