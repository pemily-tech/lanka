import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ApiEndpoints } from '../helpers/primitives';
import { HttpService } from '../services/http-service';
import { queryClient } from '../services/providers';
import useGetClinicLogo from './get-clinic-logo';

import { env } from '@/env.mjs';

const uploadLogo = async (payload: FormData) => {
	try {
		const { data } = await HttpService.post(
			`${env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.UploadLogo}`,
			payload,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					'cache-control': 'no-cache',
				},
			}
		);
		return data;
	} catch (err) {
		console.error(err);
		throw new Error('Network Error');
	}
};

export function useUploadClinicLogo() {
	return useMutation({
		mutationFn: uploadLogo,
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
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

export default useUploadClinicLogo;
