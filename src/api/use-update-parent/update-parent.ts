import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ApiEndpoints } from '../../helpers/primitives';
import { HttpService } from '../../services/http-service';
import { closeModal } from '../../store/modal';
import useGetParentById from '../use-get-parent-by-id/get-parent-by-id';

interface IPayload {
	name?: string;
	comment?: string;
	active: boolean;
}

const updateParent = async (payload: IPayload, parentId: string) => {
	try {
		const { data } = await HttpService.patch(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.UpdateParent}/${parentId}`,
			payload
		);
		return data;
	} catch (err) {
		console.error(err);
		throw new Error('Network Error');
	}
};

export function useUpdateParent({
	memberId,
	parentId,
	refetchParents,
}: {
	memberId: string;
	parentId: string;
	refetchParents: () => void;
}) {
	const dispatch = useDispatch();
	const { refetch } = useGetParentById(parentId);

	return useMutation({
		mutationFn: (payload: IPayload) => updateParent(payload, memberId),
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				refetch();
				refetchParents();
				dispatch(closeModal());
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

export default useUpdateParent;
