import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AppConstants } from '@/helpers/primitives';
import { HttpService } from '@/services/http-service';
import { queryClient } from '@/services/providers';
import { useAuthStore } from '@/store/user-auth';

interface IPayload {
	line1: string;
	line2?: string;
	pincode: string;
	district: string;
	state: string;
	type: string;
}

const updateAddress = async (payload: IPayload, addressId: string) => {
	const { data } = await HttpService.patch(`/address/${addressId}`, payload);
	return data;
};

export function useUpdateAddress(addressId: string) {
	const { userId } = useAuthStore();

	return useMutation({
		mutationFn: (payload: IPayload) => updateAddress(payload, addressId),
		onSuccess: (data) => {
			if (data?.status === AppConstants.Success) {
				queryClient.invalidateQueries({
					queryKey: ['user/userId', userId],
				});
				toast.success('Address updated successfully!');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
