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

const updateItem = async (payload: IPayload, itemId: string) => {
	try {
		const { data } = await HttpService.patch<
			ICommonTypes.IApiResponse<{ item: IInvoiceTypes.IProduct }>
		>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/item/update/${itemId}`,
			payload
		);
		return data;
	} catch (err) {
		console.error(err);
		throw new Error('Network Error');
	}
};

export function useUpdateItem(itemId: string) {
	return useMutation({
		mutationFn: (payload: IPayload) => updateItem(payload, itemId),
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
