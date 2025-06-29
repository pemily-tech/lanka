import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AppConstants } from '@/helpers/primitives';
import { HttpService } from '@/services/http-service';

const uploadDoctorSignature = async (payload: FormData, id: string) => {
	const { data } = await HttpService.post(
		`clinic/uploadDoctorSignature/${id}`,
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

export function useUploadDoctorSignature(id: string) {
	return useMutation({
		mutationFn: (payload: FormData) => uploadDoctorSignature(payload, id),
		onSuccess: (data) => {
			if (data?.status === AppConstants.Success) {
				toast.success('Signature updated!');
			} else {
				toast.error('Unable to upload');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
