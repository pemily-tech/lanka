import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AppConstants } from '@/helpers/primitives';
import { HttpService } from '@/services/http-service';

interface IPayload {
	comment?: string;
	active?: boolean;
	type: string;
}

const updateMedicalRecord = async (payload: IPayload, id: string) => {
	const { data } = await HttpService.patch(
		`/clinic/updateMedicalRecord/${id}`,
		payload
	);
	return data;
};

export function useUpdateMedicalRecord({ id }: { id: string }) {
	return useMutation({
		mutationFn: (payload: IPayload) => updateMedicalRecord(payload, id),
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
