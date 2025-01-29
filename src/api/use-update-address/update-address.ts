import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../services/http-service';
import { useAppSelector } from '../../store';
import { useGetUser } from '../user-details/user-details';

interface IPayload {
	line1: string;
	line2: string;
	pincode: string;
	district: string;
	state: string;
	type: string;
}

const updateAddress = async (payload: IPayload, addressId: string) => {
	try {
		const { data } = await HttpService.patch(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/address/${addressId}`,
			payload
		);
		return data;
	} catch (err) {
		console.error(err);
		throw new Error('Network Error');
	}
};

export function useUpdateAddress(addressId: string) {
	const authState = useAppSelector((state) => state.auth);
	const { refetch } = useGetUser(authState.userId as string);

	return useMutation({
		mutationFn: (payload: IPayload) => updateAddress(payload, addressId),
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				refetch();
				toast.success('Address updated successfully!');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}

export default useUpdateAddress;
