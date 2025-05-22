import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '@/services/http-service';
import { type IPetParent } from '@/types/clinic';
import { type IApiResponse } from '@/types/common';

const getParentById = async ({
	queryKey,
}: QueryFunctionContext<[string, string]>) => {
	const [_key, _params] = queryKey;
	const url = `/${_key}?parentId=${_params}`;
	const { data } =
		await HttpService.get<IApiResponse<{ parents: IPetParent[] }>>(url);
	return data;
};

export function useGetParentById(parentId: string) {
	return useQuery({
		queryKey: ['clinic/parents', parentId],
		queryFn: getParentById,
		enabled: !!parentId,
	});
}
