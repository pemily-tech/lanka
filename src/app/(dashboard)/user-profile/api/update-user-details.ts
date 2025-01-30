import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ApiEndpoints } from '../../../../helpers/primitives';
import { HttpService } from '../../../../services/http-service';

interface IPayload {
	name: string;
	email?: string;
	gender?: string;
	dob?: string;
}

const updateUserDetails = async (payload: IPayload) => {
	try {
		const { data } = await HttpService.patch<
			ICommonTypes.IApiResponse<{ user: IUserTypes.IUserDetails }>
		>(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.UpdateUserBasic}`,
			payload
		);
		return data;
	} catch (err) {
		console.error(err);
		throw new Error('Network Error');
	}
};

export function useUpdateUserDetails() {
	return useMutation({
		mutationFn: updateUserDetails,
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
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

export default useUpdateUserDetails;
