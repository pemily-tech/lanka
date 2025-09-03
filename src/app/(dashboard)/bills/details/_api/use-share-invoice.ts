import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../services/http-service';
import { type IApiResponse } from '../../../../../types/common';

import { AppConstants } from '@/helpers/primitives';

const shareInvoice = async (id: string) => {
	const { data } = await HttpService.post<IApiResponse<{ success: boolean }>>(
		`invoice/share/${id}`
	);
	return data;
};

export const useShareInvoice = (id: string) => {
	return useMutation({
		mutationFn: () => shareInvoice(id),
		onSuccess: (data) => {
			if (data?.status === AppConstants.Success) {
				toast.success('Invoice shared Successfully!');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
};
