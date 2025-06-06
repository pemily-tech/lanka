import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '../../services/http-service';
import { closeModal } from '../../store/modal';
import useGetPets from '../use-get-pets/get-pets';

import { env } from '@/env.mjs';

interface IPayload {
	name: string;
	breed: string;
	gender: string;
	type: string;
	dob: string;
	parentId?: string;
	microChipNo?: string;
	oldCode?: string;
}

const createPet = async (payload: IPayload) => {
	try {
		const { data } = await HttpService.post(
			`${env.NEXT_PUBLIC_BASE_PATH}/pet`,
			payload
		);
		return data;
	} catch (err) {
		console.error(err);
		throw new Error('Network Error');
	}
};

export function useCreatePet({
	parentId,
	refetchParents,
}: {
	parentId: string;
	refetchParents: () => void;
}) {
	const dispatch = useDispatch();
	const { refetch } = useGetPets(parentId);

	return useMutation({
		mutationFn: createPet,
		onSuccess: (data) => {
			if (data?.status === 'SUCCESS') {
				dispatch(closeModal());
				refetch();
				refetchParents();
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

export default useCreatePet;
