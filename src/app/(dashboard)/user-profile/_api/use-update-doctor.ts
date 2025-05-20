import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '@/services/http-service';

interface IPayload {
	name: string;
	degree: string;
	experience: string;
	speciality: string;
	regNo: string;
}

const updateDoctor = async (payload: IPayload, doctorId: string) => {
	try {
		const { data } = await HttpService.patch(
			`/clinic/updateDoctor/${doctorId}`,
			payload
		);
		return data;
	} catch (err) {
		console.error(err);
		throw new Error('Network Error');
	}
};

export function useUpdateDoctor(doctorId: string) {
	return useMutation({
		mutationFn: (payload: IPayload) => updateDoctor(payload, doctorId),
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
