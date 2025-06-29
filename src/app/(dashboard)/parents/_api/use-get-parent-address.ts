import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '@/services/http-service';
import { type IAddress, type IApiResponse } from '@/types/common';

const getParentById = async ({
	queryKey,
}: QueryFunctionContext<[string, string | undefined]>) => {
	const [_key, _params] = queryKey;
	const url = `/${_key}/${_params}`;
	const { data } =
		await HttpService.get<IApiResponse<{ address: IAddress }>>(url);
	return data;
};

export function useGetParentAddress(addressId?: string) {
	return useQuery({
		queryKey: ['address/id', addressId],
		queryFn: getParentById,
		enabled: !!addressId,
	});
}
