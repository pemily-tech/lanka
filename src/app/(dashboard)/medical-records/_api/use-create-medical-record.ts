import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AppConstants } from '@/helpers/primitives';
import { HttpService } from '@/services/http-service';

const uploadMedicalRecord = async (payload: FormData, petId: string) => {
	const { data } = await HttpService.patch(
		`/clinic/uploadMedicalRecord/${petId}`,
		payload,
		{
			headers: {
				'Content-Type': 'multipart/form-data',
				'cache-control': 'no-cache',
			},
		}
	);
	return data;
};

export function useUploadMedicalRecord({ petId }: { petId: string }) {
	return useMutation({
		mutationFn: (payload: FormData) => uploadMedicalRecord(payload, petId),
		onSuccess: (data) => {
			if (data?.status === AppConstants.Success) {
				toast.success('Medical record updated!');
			} else {
				toast.error('Unable to upload');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
