import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../../../services/http-service';
import { useGetMedicineById } from './use-get-medicine-byid';

import { AppConstants } from '@/helpers/primitives';

interface IPayload {
	name: string;
	strength: string;
	interval: string;
	dose: string;
	frequency: string;
	duration: string;
	take: string;
	// brand: string;
	// diagnosis: string;
	active?: boolean;
}

const updateMedicine = async (payload: IPayload, medicineId: string) => {
	const { data } = await HttpService.patch(
		`/medicine/update/${medicineId}`,
		payload
	);
	return data;
};

export const useUpdateMedicine = (medicineId: string) => {
	const { refetch } = useGetMedicineById(medicineId as string);

	return useMutation({
		mutationFn: (payload: IPayload) => updateMedicine(payload, medicineId),
		onSuccess: (data) => {
			if (data?.status === AppConstants.Success) {
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
};
