import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AppConstants } from '@/helpers/primitives';
import { HttpService } from '@/services/http-service';
import { queryClient } from '@/services/providers';

const uploadLogo = async (payload: FormData) => {
	const { data } = await HttpService.post(`/clinic/uploadLogo`, payload, {
		headers: {
			'Content-Type': 'multipart/form-data',
			'cache-control': 'no-cache',
		},
	});
	return data;
};

export function useUploadClinicLogo() {
	return useMutation({
		mutationFn: uploadLogo,
		onSuccess: (data) => {
			if (data?.status === AppConstants.Success) {
				queryClient.invalidateQueries({
					queryKey: ['clinic/logoUrl'],
				});
				toast.success('Profile updated!');
			} else {
				toast.error('Unable to upload');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
