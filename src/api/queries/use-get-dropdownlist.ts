import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '@/services/http-service';
import { type IApiResponse } from '@/types/common';

const getDropdownList = async ({
	queryKey,
}: QueryFunctionContext<[string, string]>) => {
	const [_key, _params] = queryKey;
	const { data } = await HttpService.get<
		IApiResponse<{
			dropdown: { label: string; value: string }[];
		}>
	>(`/${_key}/${_params}`);
	return data;
};

export function useGetDropdownList(key: string, enabled?: boolean) {
	return useQuery({
		queryKey: ['app/utils/dropdown', key],
		queryFn: getDropdownList,
		enabled,
	});
}
