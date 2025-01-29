import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ApiEndpoints } from '../../helpers/primitives';
import { HttpService } from '../../services/http-service';
import useGetDoctors from '../use-get-doctors/get-doctors';

interface IPayload {
	name: string;
	degree: string;
	experience: string;
	speciality: string;
}

const createDoctor = async (payload: IPayload) => {
	try {
		const { data } = await HttpService.post(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.AddClinicDoctor}`,
			payload
		);
		return data;
	} catch (err) {
		console.error(err);
		throw new Error('Network Error');
	}
};

export function useCreateDoctor(handleClose: () => void) {
	const { refetch } = useGetDoctors();

	return useMutation({
		mutationFn: createDoctor,
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

export default useCreateDoctor;
