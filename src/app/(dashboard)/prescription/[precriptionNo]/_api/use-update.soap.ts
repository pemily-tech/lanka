import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../services/http-service';
import { type IApiResponse } from '../../../../../types/common';
import { type IPrescription } from '../../../../../types/prescription';

interface IPayload {
	subjective?: string;
	objective?: string;
	assessment?: string;
	plan?: string;
}

const updateSoap = async (payload: IPayload, id: string) => {
	const { data } = await HttpService.patch<
		IApiResponse<{ prescription: IPrescription }>
	>(`prescription/updateSOAP/${id}`, payload);
	return data;
};

export const useUpdateSoap = (id: string) => {
	return useMutation({
		mutationFn: (payload: IPayload) => updateSoap(payload, id),
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
};
