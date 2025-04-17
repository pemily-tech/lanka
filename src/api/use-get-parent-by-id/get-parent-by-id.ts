import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../services/http-service';
import { type IPetParentsApiResponse } from '../../types/clinic';
import { type IApiResponse } from '../../types/common';

import { env } from '@/env.mjs';

const getParentById = async ({
	queryKey,
}: QueryFunctionContext<[string, string]>) => {
	const [_key, _params] = queryKey;
	const url = `${env.NEXT_PUBLIC_BASE_PATH}/${_key}?parentId=${_params}`;
	const { data } =
		await HttpService.get<IApiResponse<IPetParentsApiResponse>>(url);
	return data;
};

export function useGetParentById(parentId: string) {
	return useQuery({
		queryKey: ['clinic/parents', parentId],
		queryFn: getParentById,
		enabled: !!parentId,
	});
}

export default useGetParentById;
