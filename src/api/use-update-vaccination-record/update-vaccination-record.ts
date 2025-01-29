import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ApiEndpoints } from '../../helpers/primitives';
import { HttpService } from '../../services/http-service';

interface IPayload {
	vaccinatedOnDate?: string;
	active?: boolean;
	id: string;
	repeatAfter?: string;
}

const updateVaccinationRecord = async (payload: IPayload) => {
	const { id, ...rest } = payload;
	try {
		const { data } = await HttpService.patch(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.UpdateClinicVaccination}/${id}`,
			rest
		);
		return data;
	} catch (err) {
		console.error(err);
		throw new Error('Network Error');
	}
};

export function useUpdateVaccinationRecord({
	refetch,
}: {
	refetch: () => void;
}) {
	return useMutation({
		mutationFn: (payload: IPayload) => updateVaccinationRecord(payload),
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				refetch();
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

export default useUpdateVaccinationRecord;
