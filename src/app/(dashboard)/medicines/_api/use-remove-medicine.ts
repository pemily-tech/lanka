import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../services/http-service';
import { queryClient } from '../../../../services/providers';
import { type IApiResponse } from '../../../../types/common';
import { type IMedicine } from '../../../../types/prescription';

import { AppConstants } from '@/helpers/primitives';

const removeMedicine = async (payload: { id: string }) => {
	const { id } = payload;
	const { data } = await HttpService.patch<
		IApiResponse<{ medicine: IMedicine }>
	>(`/medicine/remove/${id}`);
	return data;
};

export const useRemoveMedicine = () => {
	return useMutation({
		mutationFn: (payload: { id: string }) => removeMedicine(payload),
		onSuccess: (data) => {
			if (data?.status === AppConstants.Success) {
				queryClient.invalidateQueries({
					queryKey: [
						'medicine/list',
						{ page: 0, count: 1, limit: 15 },
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
