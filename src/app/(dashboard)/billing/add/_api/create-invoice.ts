import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../services/http-service';
import { type IApiResponse } from '../../../../../types/common';
import { type IInvoice } from '../../../../../types/invoice';

import { env } from '@/env.mjs';

interface IPayload {
	parentId: string;
}

const createInvoice = async (payload: IPayload) => {
	try {
		const { data } = await HttpService.post<
			IApiResponse<{ invoice: IInvoice }>
		>(`${env.NEXT_PUBLIC_BASE_PATH}/invoice/create`, payload);
		return data;
	} catch (err) {
		console.error(err);
		throw new Error('Network Error');
	}
};

export function useCreateInvoice() {
	return useMutation({
		mutationFn: createInvoice,
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				toast.success('Item updated successfully!');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
