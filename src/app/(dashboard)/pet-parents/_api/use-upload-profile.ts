import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AppConstants } from '@/helpers/primitives';
import { HttpService } from '@/services/http-service';

const uploadPetParentProfile = async (payload: FormData, id: string) => {
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
};

export function useUploadPetParentProfile(id: string) {
	return useMutation({
		mutationFn: (payload: FormData) => uploadPetParentProfile(payload, id),
		onSuccess: (data) => {
			if (data?.status === AppConstants.Success) {
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
