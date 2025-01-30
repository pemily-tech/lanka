import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../services/http-service';

interface IPayload {
	name: string;
	type: string;
	description: string;
	quantity: number;
	mrp: number;
	price: number;
}

const addItem = async (payload: IPayload) => {
	try {
		const { data } = await HttpService.post<
			ICommonTypes.IApiResponse<{ item: IInvoiceTypes.IProduct }>
		>(`${process.env.NEXT_PUBLIC_BASE_PATH}/item/create`, payload);
		return data;
	} catch (err) {
		console.error(err);
		throw new Error('Network Error');
	}
};

export function useAddItem() {
	return useMutation({
		mutationFn: addItem,
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				toast.success('Item created successfully!');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
