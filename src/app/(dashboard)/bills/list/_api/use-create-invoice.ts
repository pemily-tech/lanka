import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AppConstants } from '@/helpers/primitives';
import { HttpService } from '@/services/http-service';
import { type IInvoice } from '@/types/bills-items';
import { type IApiResponse } from '@/types/common';

const createInvoice = async (payload: { parentId: string }) => {
	const { parentId } = payload;
	const { data } = await HttpService.post<
		IApiResponse<{ invoice: IInvoice }>
	>('invoice/create', {
		parentId,
	});
	return data;
};

export function useCreateInvoice() {
	return useMutation({
		mutationFn: (payload: { parentId: string }) => createInvoice(payload),
		onSuccess: (data) => {
			if (data?.status === AppConstants.Success) {
				toast.success('Invoice created Successfully!');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
