import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../../services/http-service';
import { type IApiResponse } from '../../../../../types/common';
import { type IPrescription } from '../../../../../types/prescription';

interface IPayload {
	parentName: string;
	parentMobile: string;
	patientName: string;
	patientDetails: {
		name: string;
		dob: string;
		age: string;
		gender: string;
		type: string;
		breed: string;
		weight: string;
		microChipNo: string;
		code: string;
	};
	clinicDetails: {
		name: string;
		primaryContact: string;
		businessContact: string;
		email: string;
	};
	doctorDetails: {
		name: string;
		experience: number;
		degree: string;
		speciality: string;
		regNo: string;
		signatureUrl: string;
	};
	parentOrPatientAddress: {
		pincode: string;
		line1: string;
		line2: string;
		state: string;
		district: string;
	};
	clinicAddress: {
		pincode: string;
		line1: string;
		line2: string;
		state: string;
		district: string;
	};
	medicines: {
		name: string;
		strength: string;
		interval: string;
		dose: string;
		frequency: string;
		duration: string;
		take: string;
	}[];
	diagnosis?: string;
	vitals?: string;
	advice?: string;
	nextVisit?: string | null;
}

const updatePrescription = async (payload: IPayload, id: string) => {
	const { data } = await HttpService.patch<
		IApiResponse<{ prescription: IPrescription }>
	>(`prescription/update/${id}`, payload);
	return data;
};

export const useUpdatePrescription = (id: string) => {
	return useMutation({
		mutationFn: (payload: IPayload) => updatePrescription(payload, id),
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
