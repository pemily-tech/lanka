import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../../../../../services/http-service';

const getItemById = async ({
	queryKey,
}: QueryFunctionContext<[string, string | undefined]>) => {
	const [_key, _params] = queryKey;
	const url = `${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}/${_params}`;
	const { data } =
		await HttpService.get<
			ICommonTypes.IApiResponse<{ item: IInvoiceTypes.IProduct }>
		>(url);
	return data;
};

export function useGetItemById(itemId?: string) {
	return useQuery({
		queryKey: ['item/byId', itemId],
		queryFn: getItemById,
		enabled: !!itemId,
	});
}
