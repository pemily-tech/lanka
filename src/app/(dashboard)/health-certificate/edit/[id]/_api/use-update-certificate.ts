import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AppConstants } from '@/helpers/primitives';
import { HttpService } from '@/services/http-service';
import { type IApiResponse } from '@/types/common';
import {
	type ICertificate,
	type ICertificateTemplate,
	type IClinicAddress,
	type IClinicDetails,
	type IPatientDetails,
} from '@/types/health-certificate';

interface IPayload {
	parentName: string;
	parentMobile: string;
	patientName: string;
	patientDetails: IPatientDetails;
	clinicDetails: IClinicDetails;
	clinicAddress: IClinicAddress;
	parentOrPatientAddress: IClinicAddress;
	template: ICertificateTemplate;
	vaccines: {
		name: string;
		batch: string | null;
		brand: string | null;
		givenOn: string;
		dueDate: string;
	}[];
}

const updateCertificate = async (payload: IPayload, id: string) => {
	const { data } = await HttpService.patch<
		IApiResponse<{ certificate: ICertificate }>
	>(`certificate/update/${id}`, payload);
	return data;
};

export const useUpdateCertificate = (id: string) => {
	return useMutation({
		mutationFn: (payload: IPayload) => updateCertificate(payload, id),
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
};
