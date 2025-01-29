import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ApiEndpoints } from '../../helpers/primitives';
import { HttpService } from '../../services/http-service';
import useGetDoctorById from '../use-get-doctor-by-id/get-doctor-by-id';
import useGetDoctors from '../use-get-doctors/get-doctors';

interface IPayload {
	name: string;
	degree: string;
	experience: string;
	speciality: string;
}

const updateDoctor = async (payload: IPayload, doctorId: string) => {
	try {
		const { data } = await HttpService.patch(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.UpdateDoctor}/${doctorId}`,
			payload
		);
		return data;
	} catch (err) {
		console.error(err);
		throw new Error('Network Error');
	}
};

export function useUpdateDoctor(doctorId: string, handleClose: () => void) {
	const { refetch } = useGetDoctors();
	const { refetch: refetchDoctor } = useGetDoctorById(doctorId);

	return useMutation({
		mutationFn: (payload: IPayload) => updateDoctor(payload, doctorId),
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				refetch();
				refetchDoctor();
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

export default useUpdateDoctor;
