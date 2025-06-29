import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AppConstants } from '@/helpers/primitives';
import { HttpService } from '@/services/http-service';
import { queryClient } from '@/services/providers';
import { useAuthStore } from '@/store/user-auth';

interface IPayload {
	ownerName?: string;
	pan?: string;
	gstNo?: string;
	businessContact?: number;
}

const updateBusiness = async (payload: IPayload) => {
	const { data } = await HttpService.patch(`/user/businessDetail`, payload);
	return data;
};

export function useUpdateBusiness() {
	const { userId } = useAuthStore();

	return useMutation({
		mutationFn: updateBusiness,
		onSuccess: (data) => {
			if (data?.status === AppConstants.Success) {
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
