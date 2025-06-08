import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../services/http-service';
import { type IApiResponse } from '../../../../types/common';
import { type IProduct } from '../../../../types/invoice';

import { AppConstants } from '@/helpers/primitives';

interface IPayload {
	name: string;
	type: string;
	description: string;
	quantity: number;
	mrp: number;
	price: number;
}

const updateItem = async (payload: IPayload, itemId: string) => {
	const { data } = await HttpService.patch<IApiResponse<{ item: IProduct }>>(
		`/item/update/${itemId}`,
		payload
	);
	return data;
};

export function useUpdateItem(itemId: string) {
	return useMutation({
		mutationFn: (payload: IPayload) => updateItem(payload, itemId),
		onSuccess: (data) => {
			if (data?.status === AppConstants.Success) {
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
