import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { AppConstants } from '@/helpers/primitives';
import { HttpService } from '@/services/http-service';
import { queryClient } from '@/services/providers';
import { type IItem } from '@/types/bills-items';
import { type IApiResponse } from '@/types/common';

const removeItem = async (payload: { id: string }) => {
	const { id } = payload;
	const { data } = await HttpService.patch<IApiResponse<{ item: IItem }>>(
		`/item/remove/${id}`
	);
	return data;
};

export function useRemoveItem() {
	const searchParams = useSearchParams();
	const type = searchParams.get('type') ?? 'PRODUCT';

	return useMutation({
		mutationFn: (payload: { id: string }) => removeItem(payload),
		onSuccess: (data) => {
			if (data?.status === AppConstants.Success) {
				queryClient.invalidateQueries({
					queryKey: [
						'item/list',
						{ page: 0, count: 1, limit: 15, type },
					],
				});
				toast.success('Removed Successfully!');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
