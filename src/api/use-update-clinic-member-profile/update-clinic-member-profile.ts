import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ApiEndpoints } from '../../helpers/primitives';
import { HttpService } from '../../services/http-service';
import { useGetUserProfileUrl } from '../profile-image/profile-image';

const uploadClinicMemberProfile = async (
	payload: FormData,
	clinicMemberUserId: string
) => {
	try {
		const { data } = await HttpService.patch(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.UploadClinicMemberProfile}/${clinicMemberUserId}`,
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

export function useUpdateClinicMemberProfile(clinicMemberUserId: string) {
	const { refetch } = useGetUserProfileUrl(clinicMemberUserId as string);
	return useMutation({
		mutationFn: (payload: FormData) =>
			uploadClinicMemberProfile(payload, clinicMemberUserId),
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				refetch();
				toast.success('Updated Successfully!');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}

export default useUpdateClinicMemberProfile;
