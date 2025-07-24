import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../services/http-service';

import { AppConstants } from '@/helpers/primitives';

interface IPayload {
	name: string;
	type: 'SERVICE' | 'PRODUCT';
	description: string;
	quantity: number;
	mrp: number;
	price: number;
}

const updateItem = async (payload: IPayload, itemId: string) => {
	const { data } = await HttpService.patch(`/item/update/${itemId}`, payload);
	return data;
};

export const useUpdateItem = (itemId: string) => {
	return useMutation({
		mutationFn: (payload: IPayload) => updateItem(payload, itemId),
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
