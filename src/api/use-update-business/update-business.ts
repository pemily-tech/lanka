import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../services/http-service';
import { queryClient } from '../../services/providers';
import { useAppSelector } from '../../store';
import { useAuthStore } from '../../store/user-auth';
import { useGetUser } from '../user-details/user-details';

import { env } from '@/env.mjs';

interface IPayload {
	ownerName?: string;
	pan?: string;
	gstNo?: string;
	businessContact?: number;
}

const updateBusiness = async (payload: IPayload) => {
	try {
		const { data } = await HttpService.patch(
			`${env.NEXT_PUBLIC_BASE_PATH}/user/businessDetail`,
			payload
		);
		return data;
	} catch (err) {
		console.error(err);
		throw new Error('Network Error');
	}
};

export function useUpdateBusiness() {
	const { userId } = useAuthStore();

	return useMutation({
		mutationFn: updateBusiness,
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				queryClient.invalidateQueries({
					queryKey: ['user/userId', userId],
				});
				toast.success('Business details updated successfully!');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}

export default useUpdateBusiness;
