import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ApiEndpoints } from '../../helpers/primitives';
import { HttpService } from '../../services/http-service';
import useGetStaff from '../use-get-staff/get-staff';
import useGetStaffById from '../use-get-staff-by-id/get-staff-by-id';

import { env } from '@/env.mjs';

interface IPayload {
	name: string;
	active: boolean;
}

const updateStaff = async (payload: IPayload, staffId: string) => {
	try {
		const { data } = await HttpService.patch(
			`${env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.UpdateStaff}/${staffId}`,
			payload
		);
		return data;
	} catch (err) {
		console.error(err);
		throw new Error('Network Error');
	}
};

export function useUpdateStaff(staffId: string, handleClose: () => void) {
	const { refetch } = useGetStaff();
	const { refetch: refetchStaff } = useGetStaffById(staffId);

	return useMutation({
		mutationFn: (payload: IPayload) => updateStaff(payload, staffId),
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				refetch();
				refetchStaff();
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

export default useUpdateStaff;
