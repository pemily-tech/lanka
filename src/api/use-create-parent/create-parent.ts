import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ApiEndpoints } from '../../helpers/primitives';
import { HttpService } from '../../services/http-service';
import { closeModal } from '../../store/modal';

interface IPayload {
	mobileNumber: string;
	name?: string;
}

const createParent = async (payload: IPayload) => {
	try {
		const { data } = await HttpService.patch(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.AddParent}/${payload?.mobileNumber}`,
			{ name: payload.name }
		);
		return data;
	} catch (err) {
		console.error(err);
		throw new Error('Network Error');
	}
};

export function useCreateParent({ refetch }: { refetch: () => void }) {
	const dispatch = useDispatch();

	return useMutation({
		mutationFn: createParent,
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				dispatch(closeModal());
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

export default useCreateParent;
