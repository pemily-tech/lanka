import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../services/http-service';
import { type IApiResponse } from '../../../../types/common';
import { type IPrescription } from '../../../../types/prescription';

interface IPayload {
	parentId: string;
	doctorId: string;
	patientId: string;
}

const createPrescription = async (payload: IPayload) => {
	try {
		const { data } = await HttpService.post<
			IApiResponse<{ prescription: IPrescription }>
		>('/prescription/create', payload);
		return data;
	} catch (err) {
		console.error(err);
		throw new Error('Network Error');
	}
};

export function useCreatePrescription() {
	return useMutation({
		mutationFn: createPrescription,
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				toast.success('Prescription created successfully!');
			} else {
				toast.error('Unable to upload');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
