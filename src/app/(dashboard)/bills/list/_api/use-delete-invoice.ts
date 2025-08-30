import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { DEFAULT_DATE_FORMAT } from '@/helpers/constant';
import { AppConstants } from '@/helpers/primitives';
import { HttpService } from '@/services/http-service';
import { queryClient } from '@/services/providers';
import { type IInvoice } from '@/types/bills-items';
import { type IApiResponse } from '@/types/common';

const removeInvoice = async (payload: { id: string; active: boolean }) => {
	const { id, active } = payload;
	const { data } = await HttpService.patch<
		IApiResponse<{ invoice: IInvoice }>
	>(`/invoice/delete/${id}`, {
		active,
	});
	return data;
};

export function useRemoveInvoice() {
	const searchParams = useSearchParams();
	const filter = searchParams.get('filter') ?? '';
	const page = searchParams.get('page') ?? 0;
	const type = searchParams.get('type') ?? 'ACTIVE';
	const startDate =
		searchParams.get('start') ?? format(new Date(), DEFAULT_DATE_FORMAT);
	const endDate =
		searchParams.get('end') ?? format(new Date(), DEFAULT_DATE_FORMAT);

	return useMutation({
		mutationFn: (payload: { id: string; active: boolean }) =>
			removeInvoice(payload),
		onSuccess: (data) => {
			if (data?.status === AppConstants.Success) {
				queryClient.invalidateQueries({
					queryKey: [
						'invoice/list',
						{
							page,
							count: 1,
							limit: 15,
							filter,
							type,
							startDate,
							endDate,
						},
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
