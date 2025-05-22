import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '@/services/http-service';

const uploadPetParentProfile = async (payload: FormData, id: string) => {
	try {
		const { data } = await HttpService.patch(
			`clinic/uploadClinicMemberProfile/${id}`,
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

export function useUploadPetParentProfile(id: string) {
	return useMutation({
		mutationFn: (payload: FormData) => uploadPetParentProfile(payload, id),
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
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
