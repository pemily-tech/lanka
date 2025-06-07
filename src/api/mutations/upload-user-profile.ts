import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useGetUserProfileUrl } from '../queries/use-get-user-profile-image';

import { HttpService } from '@/services/http-service';
import { useAuthStore } from '@/store/user-auth';

const uploadProfile = async (payload: FormData) => {
	const { data } = await HttpService.post(`/user/uploadProfile`, payload, {
		headers: {
			'Content-Type': 'multipart/form-data',
			'cache-control': 'no-cache',
		},
	});
	return data;
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
