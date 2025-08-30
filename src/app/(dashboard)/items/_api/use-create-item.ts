import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AppConstants } from '@/helpers/primitives';
import { HttpService } from '@/services/http-service';
import { type IItem } from '@/types/bills-items';
import { type IApiResponse } from '@/types/common';

interface IPayload {
	name: string;
	type: 'SERVICE' | 'PRODUCT';
	description: string;
	quantity: number;
	mrp: number;
	price: number;
}

const createItem = async (payload: IPayload) => {
	const { data } = await HttpService.post<IApiResponse<{ item: IItem }>>(
		`/item/create`,
		payload
	);
	return data;
};

export const useCreateItem = () => {
	return useMutation({
		mutationFn: (payload: IPayload) => createItem(payload),
		onSuccess: (data) => {
			if (data?.status === AppConstants.Success) {
				toast.success('Updated Successfully!');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
};
