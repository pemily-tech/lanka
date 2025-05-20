import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ApiEndpoints } from '../../helpers/primitives';
import { HttpService } from '../../services/http-service';

import { env } from '@/env.mjs';

interface IPayload {
	followUpCompleteDate?: string;
	repeatAfter?: string;
	active: boolean;
	id: string;
}

const updateFollowupRecord = async (payload: IPayload) => {
	const { id, ...rest } = payload;
	try {
		const { data } = await HttpService.patch(
			`${env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.UpdateClinicFollowup}/${id}`,
			rest
		);
		return data;
	} catch (err) {
		console.error(err);
		throw new Error('Network Error');
	}
};

export function useUpdateFollowUpRecord({ refetch }: { refetch: () => void }) {
	return useMutation({
		mutationFn: (payload: IPayload) => updateFollowupRecord(payload),
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				refetch();
				toast.success('Updated Successfully!');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}

export default useUpdateFollowUpRecord;
