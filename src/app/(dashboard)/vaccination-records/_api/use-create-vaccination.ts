import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AppConstants } from '@/helpers/primitives';
import { HttpService } from '@/services/http-service';

interface IPayload {
	petId: string;
	parentId: string;
	vaccineName: string;
	vaccinationDates: string[];
}

const createVaccination = async (payload: IPayload) => {
	const { data } = await HttpService.post(`/clinic/addVaccination`, payload);
	return data;
};

export function useCreateVaccination() {
	return useMutation({
		mutationFn: createVaccination,
		onSuccess: (data) => {
			if (data?.status === AppConstants.Success) {
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
