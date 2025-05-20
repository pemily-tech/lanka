import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../services/http-service';

const downloadDocument = async (payload: { key: string }) => {
	try {
		const { data } = await HttpService.post('doc/download', payload);
		return data;
	} catch (err) {
		console.error(err);
		throw new Error('Network Error');
	}
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

export default useDownloadDocument;
