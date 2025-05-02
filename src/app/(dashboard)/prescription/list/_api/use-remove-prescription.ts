import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { HttpService } from '../../../../../services/http-service';
import { queryClient } from '../../../../../services/providers';
import { type IApiResponse } from '../../../../../types/common';
import { type IPrescription } from '../../../../../types/prescription';

const removePrescription = async (payload: { id: string }) => {
	const { id } = payload;
	try {
		const { data } = await HttpService.patch<
			IApiResponse<{ prescription: IPrescription }>
		>(`/prescription/remove/${id}`);
		return data;
	} catch (err) {
		throw new Error('Network Error');
	}
};

export const useRemovePrescription = () => {
	const searchParams = useSearchParams();
	const date = searchParams.get('date');
	const page = searchParams.get('page');

	return useMutation({
		mutationFn: (payload: { id: string }) => removePrescription(payload),
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				queryClient.invalidateQueries({
					queryKey: [
						'prescription/list',
						{
							page: page ? page : 0,
							count: 1,
							limit: 15,
							prescriptionDate: date
								? date
								: format(new Date(), 'yyyy-MM-dd'),
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
};
