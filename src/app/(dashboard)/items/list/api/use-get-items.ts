import {
	keepPreviousData,
	type QueryFunctionContext,
	useQuery,
} from '@tanstack/react-query';

import { HttpService } from '../../../../../services/http-service';

const getProductsList = async ({
	queryKey,
}: QueryFunctionContext<
	[string, string, number, 'PRODUCT' | 'SERVICE', number]
>) => {
	const [_key, searchTerm, limit, type, page] = queryKey;

	let url = `${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}?page=${page}&limit=${limit}&type=${type}`;

	if (searchTerm && searchTerm.length > 2) {
		url += `&searchTerm=${searchTerm}`;
	}

	const { data } = await HttpService.get<
		ICommonTypes.IApiResponse<{
			items: IInvoiceTypes.IProduct[];
			totalCount: number;
		}>
	>(url);

	return data;
};

export function useGetProductsList({
	searchTerm,
	apiKey,
	type,
	page,
	limit,
}: {
	searchTerm: string;
	apiKey: string;
	type: 'PRODUCT' | 'SERVICE';
	page: number;
	limit: number;
}) {
	return useQuery({
		queryKey: [apiKey, searchTerm, limit, type, page],
		queryFn: getProductsList,
		placeholderData: keepPreviousData,
	});
}
