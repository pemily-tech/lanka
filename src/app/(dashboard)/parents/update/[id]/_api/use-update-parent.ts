import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { HttpService } from '@/services/http-service';

interface IPayload {
	name?: string;
	comment?: string;
	active: boolean;
	mobile: number;
}

const updateParent = async (payload: IPayload, parentId: string) => {
	const { data } = await HttpService.patch(
		`/clinic/updateMember/${parentId}`,
		payload
	);
	return data;
};

export function useUpdateParent({ memberId }: { memberId: string }) {
	return useMutation({
		mutationFn: (payload: IPayload) => updateParent(payload, memberId),
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
