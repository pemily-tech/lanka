import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../services/http-service';
import { queryClient } from '../../../../services/providers';
import { useAuthStore } from '../../../../store/user-auth';

interface IPayload {
	line1: string;
	line2?: string;
	pincode: string;
	district: string;
	state: string;
	type: string;
	isPrimary?: boolean;
}

const createAddress = async (payload: IPayload) => {
	const { data } = await HttpService.post(`/address`, payload);
	return data;
};

export function useCreateAddress() {
	const { userId } = useAuthStore();

	return useMutation({
		mutationFn: createAddress,
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				queryClient.invalidateQueries({
					queryKey: ['user/userId', userId],
				});
				toast.success('Address created successfully!');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
