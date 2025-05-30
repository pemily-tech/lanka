import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '@/services/http-service';

interface IPayload {
	vaccinatedOnDate?: string;
	active?: boolean;
	id: string;
	repeatAfter?: string;
}

const updateVaccination = async (payload: IPayload) => {
	const { id, ...rest } = payload;
	const { data } = await HttpService.patch(
		`/clinic/updateVaccination/${id}`,
		rest
	);
	return data;
};

export function useUpdateVaccination() {
	return useMutation({
		mutationFn: (payload: IPayload) => updateVaccination(payload),
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
