import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '@/services/http-service';
import { type IItem } from '@/types/bills-items';
import { type IApiResponse } from '@/types/common';

const getItemById = async ({ queryKey }: QueryFunctionContext<[string]>) => {
	const [_key] = queryKey;
	const { data } = await HttpService.get<IApiResponse<{ item: IItem }>>(
		`/${_key}`
	);
	return data;
};

export function useGetItemById(itemId?: string) {
	return useQuery({
		queryKey: [`item/byId/${itemId}`],
		queryFn: getItemById,
		enabled: !!itemId,
	});
}
