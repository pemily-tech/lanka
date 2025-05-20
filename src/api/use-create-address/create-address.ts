import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../services/http-service';
import { queryClient } from '../../services/providers';
import { useAuthStore } from '../../store/user-auth';

import { env } from '@/env.mjs';

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
	try {
		const { data } = await HttpService.post(
			`${env.NEXT_PUBLIC_BASE_PATH}/address`,
			payload
		);
		return data;
	} catch (err) {
		console.error(err);
		throw new Error('Network Error');
	}
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

export default useCreateAddress;
