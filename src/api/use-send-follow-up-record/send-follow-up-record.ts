import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ApiEndpoints } from '../../helpers/primitives';
import { HttpService } from '../../services/http-service';

import { env } from '@/env.mjs';

interface IPayload {
	parentMobile: number;
	petName: string;
	clinicName: string;
	followUpDate: string;
	followUpType: string;
	id: string;
}

const follwupRemainder = async (payload: IPayload) => {
	const { id, ...rest } = payload;
	try {
		const { data } = await HttpService.patch(
			`${env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.ClinicFollowupRemainder}/${id}`,
			rest
		);
		return data;
	} catch (err) {
		console.error(err);
		throw new Error('Network Error');
	}
};

export function useSendFollowUpRecord({ refetch }: { refetch: () => void }) {
	return useMutation({
		mutationFn: follwupRemainder,
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

export default useSendFollowUpRecord;
