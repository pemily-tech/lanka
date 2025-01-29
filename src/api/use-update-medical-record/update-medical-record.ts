import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ApiEndpoints } from '../../helpers/primitives';
import { HttpService } from '../../services/http-service';

interface IPayload {
	comment?: string;
	active?: boolean;
	type: string;
}

const updateMedicalRecord = async (payload: IPayload, id: string) => {
	try {
		const { data } = await HttpService.patch(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.UpdateClinicMedicalRecords}/${id}`,
			payload
		);
		return data;
	} catch (err) {
		console.error(err);
		throw new Error('Network Error');
	}
};

export function useUpdateMedicalRecord({
	id,
	refetch,
	handleClose,
}: {
	id: string;
	refetch: () => void;
	handleClose?: () => void;
}) {
	return useMutation({
		mutationFn: (payload: IPayload) => updateMedicalRecord(payload, id),
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				refetch();
				toast.success('Updated Successfully!');
				if (handleClose) {
					handleClose();
				}
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}

export default useUpdateMedicalRecord;
