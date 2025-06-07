import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../services/http-service';
import { type IApiResponse } from '../../../../types/common';
import { type IUserDetails } from '../../../../types/user';

interface IPayload {
	name: string;
	email: string;
	gender: string;
	dob: string;
}

const updateUserDetails = async (payload: IPayload) => {
	const { data } = await HttpService.patch<
		IApiResponse<{ user: IUserDetails }>
	>('user/basicDetail', payload);
	return data;
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
