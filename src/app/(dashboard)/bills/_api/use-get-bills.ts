import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';
import qs from 'qs';

import { HttpService } from '@/services/http-service';
import { type IInvoice } from '@/types/bills-items';
import { type IApiResponse } from '@/types/common';

interface IProps {
	count?: 0 | 1;
	page?: number;
	limit?: number;
	searchTerm?: string;
	type?: 'ACTIVE' | 'INACTIVE';
	startDate?: string;
	endDate?: string;
	filter?: string | null;
}

const getBills = async ({
	queryKey,
}: QueryFunctionContext<[string, IProps]>) => {
	const [key, params] = queryKey;

	const normalizedParams = Object.fromEntries(
		Object.entries(params).map(([k, v]) => [k, v === '' ? null : v])
	);

	const query = qs.stringify(normalizedParams, {
		skipNulls: true,
		encode: false,
	});

	const url = `/${key}?${query}`;

	const { data } =
		await HttpService.get<
			IApiResponse<{ invoices: IInvoice[]; totalCount: number }>
		>(url);

	return data;
};

export function useGetBills({
	count = 0,
	page = 0,
	limit = 15,
	searchTerm = '',
	type = 'ACTIVE',
	startDate,
	endDate,
	filter,
}: IProps) {
	return useQuery({
		queryKey: [
			'invoice/list',
			{
				count,
				page,
				limit,
				searchTerm,
				type,
				startDate,
				endDate,
				filter,
			},
		],
		queryFn: getBills,
	});
}
