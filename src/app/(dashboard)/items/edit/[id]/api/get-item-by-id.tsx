import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../../../../../services/http-service';
import { type IApiResponse } from '../../../../../../types/common';
import { type IProduct } from '../../../../../../types/invoice';

const getItemById = async ({
	queryKey,
}: QueryFunctionContext<[string, string | undefined]>) => {
	const [_key, _params] = queryKey;
	const url = `/${_key}/${_params}`;
	const { data } =
		await HttpService.get<IApiResponse<{ item: IProduct }>>(url);
	return data;
};

export function useGetItemById(itemId?: string) {
	return useQuery({
		queryKey: ['item/byId', itemId],
		queryFn: getItemById,
		enabled: !!itemId,
	});
}
