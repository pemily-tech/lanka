import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AppConstants } from '@/helpers/primitives';
import { HttpService } from '@/services/http-service';
import {
	type IBillAddress,
	type IInvoice,
	type IItem,
} from '@/types/bills-items';
import { type IApiResponse } from '@/types/common';

interface IPayload {
	items: IItem;
	totalAmount: number;
	paidAmount: number;
	dueAmount: number;
	totalDiscount: number;
	subTotalAmount: number;
	billByName: string;
	billByMobile: string;
	billByAddress: IBillAddress;
	billToName: string;
	billToMobile: string;
	termsAndConditions: [];
}

const createInvoice = async (invoiceNo: string, invoicePayload: IPayload) => {
	const { data } = await HttpService.patch<
		IApiResponse<{ invoice: IInvoice }>
	>(`invoice/update/${invoiceNo}`, invoicePayload);
	return data;
};

export function useCreateInvoice(invoiceNo: string) {
	return useMutation({
		mutationFn: (payload: any) => createInvoice(invoiceNo, payload),
		onSuccess: (data) => {
			if (data?.status === AppConstants.Success) {
				toast.success('Invoice updated Successfully!');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
