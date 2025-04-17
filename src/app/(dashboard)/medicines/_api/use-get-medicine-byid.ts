import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../../../services/http-service';
import { type IApiResponse } from '../../../../types/common';
import { type IMedicine } from '../../../../types/prescription';

import { env } from '@/env.mjs';

const getMedicineById = async ({
	queryKey,
}: QueryFunctionContext<[string, string]>) => {
	const [_key, _params] = queryKey;
	const { data } = await HttpService.get<
		IApiResponse<{ medicine: { medicines: IMedicine[] } }>
	>(`${env.NEXT_PUBLIC_BASE_PATH}/${_key}/${_params}`);
	return data;
};

export function useGetMedicineById(id: string) {
	return useQuery({
		queryKey: ['medicine/byId', id],
		queryFn: getMedicineById,
		enabled: !!id,
	});
}
