import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ApiEndpoints } from '../../helpers/primitives';
import { HttpService } from '../../services/http-service';
import { useAppSelector } from '../../store';
import { useAuthStore } from '../../store/user-auth';
import { useGetUserProfileUrl } from '../profile-image/profile-image';

import { env } from '@/env.mjs';

const uploadProfile = async (payload: FormData) => {
	try {
		const { data } = await HttpService.post(
			`${env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.UploadProfile}`,
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

export function useUploadUserProfile(id?: string) {
	const { userId } = useAuthStore();
	const { refetch } = useGetUserProfileUrl(id ? id : (userId as string));

	return useMutation({
		mutationFn: uploadProfile,
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				toast.success('Profile updated!');
				refetch();
			} else {
				toast.error('Unable to upload');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}

export default useUploadUserProfile;
