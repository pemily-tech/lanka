import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ApiEndpoints } from '../../helpers/primitives';
import { HttpService } from '../../services/http-service';
import useGetStaff from '../use-get-staff/get-staff';

import { env } from '@/env.mjs';

interface IPayload {
	name: string;
}

const createStaff = async (payload: IPayload) => {
	try {
		const { data } = await HttpService.post(
			`${env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.AddStaff}`,
			payload
		);
		return data;
	} catch (err) {
		console.error(err);
		throw new Error('Network Error');
	}
};

export function useCreateStaff(handleClose: () => void) {
	const { refetch } = useGetStaff();

	return useMutation({
		mutationFn: createStaff,
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				refetch();
				handleClose();
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

export default useCreateStaff;
