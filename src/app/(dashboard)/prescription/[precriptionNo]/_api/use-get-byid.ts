import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../../../../services/http-service';
import { type IApiResponse } from '../../../../../types/common';
import { type IPrescription } from '../../../../../types/prescription';

const prescriptionById = async ({
	queryKey,
}: QueryFunctionContext<[string, string]>) => {
	const [_key, id] = queryKey;
	const { data } = await HttpService.get<
		IApiResponse<{ prescription: IPrescription }>
	>(`/${_key}/${id}`);
	return data;
};

export function useGetPrescriptionById(id: string) {
	return useQuery({
		queryKey: ['prescription/byNo', id],
		queryFn: prescriptionById,
		enabled: !!id,
	});
}
