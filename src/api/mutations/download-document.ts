import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '@/services/http-service';

const downloadDocument = async (payload: { key: string }) => {
	const { data } = await HttpService.post('doc/download', payload);
	return data;
};

export function useDownloadDocument() {
	return useMutation({
		mutationFn: downloadDocument,
		onSuccess: (data) => {
			if (data?.status !== 'SUCCESS') {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
