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

const addItem = async (payload: IPayload) => {
	const { data } = await HttpService.post<IApiResponse<{ item: IProduct }>>(
		`/item/create`,
		payload
	);
	return data;
};

export function useAddItem() {
	return useMutation({
		mutationFn: addItem,
		onSuccess: (data) => {
			if (data?.status === AppConstants.Success) {
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
