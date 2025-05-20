import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ApiEndpoints } from '../../helpers/primitives';
import { HttpService } from '../../services/http-service';

import { env } from '@/env.mjs';

interface IPayload {
	petId: string;
	parentId: string;
	vaccineName: string;
	vaccinationDates: string[];
}

const createVaccination = async (payload: IPayload) => {
	try {
		const { data } = await HttpService.post(
			`${env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.ClinicVaccination}`,
			payload
		);
		return data;
	} catch (err) {
		console.error(err);
		throw new Error('Network Error');
	}
};

export function useCreateVaccinationRecords() {
	return useMutation({
		mutationFn: createVaccination,
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

export default useCreateVaccinationRecords;
