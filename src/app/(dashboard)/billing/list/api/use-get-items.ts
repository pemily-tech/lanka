import {
	keepPreviousData,
	type QueryFunctionContext,
	useQuery,
} from '@tanstack/react-query';

import { HttpService } from '../../../../../services/http-service';
import { type IApiResponse } from '../../../../../types/common';
import { type IInvoice } from '../../../../../types/invoice';

import { env } from '@/env.mjs';

const getInvoiceList = async ({
	queryKey,
}: QueryFunctionContext<
	[string, string, number, 'ACTIVE' | 'INACTIVE', number]
>) => {
	const [_key, searchTerm, limit, type, page] = queryKey;

	let url = `${env.NEXT_PUBLIC_BASE_PATH}/${_key}?page=${page}&limit=${limit}&type=${type}`;

	if (searchTerm && searchTerm.length > 2) {
		url += `&searchTerm=${searchTerm}`;
	}

	const { data } = await HttpService.get<
		IApiResponse<{
			invoices: IInvoice[];
			totalCount: number;
		}>
	>(url);

	return data;
};

export function useGetInvoicesList({
	searchTerm,
	apiKey,
	type,
	page,
	limit,
}: {
	searchTerm: string;
	apiKey: string;
	type: 'ACTIVE' | 'INACTIVE';
	page: number;
	limit: number;
}) {
	return useQuery({
		queryKey: [apiKey, searchTerm, limit, type, page],
		queryFn: getInvoiceList,
		placeholderData: keepPreviousData,
	});
}
