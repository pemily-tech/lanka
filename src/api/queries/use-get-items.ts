import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';
import qs from 'qs';

import { HttpService } from '@/services/http-service';
import { type IItem } from '@/types/bills-items';
import { type IApiResponse } from '@/types/common';

interface IProps {
	count?: 0 | 1;
	page?: number;
	limit?: number;
	searchTerm: string;
	qty?: number;
	type: 'PRODUCT' | 'SERVICE';
	// active?: number;
}

const getItems = async ({
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
			IApiResponse<{ items: IItem[]; totalCount: number }>
		>(url);

	return data;
};

export function useGetItems({
	count = 0,
	page = 0,
	limit = 15,
	searchTerm,
	type = 'PRODUCT',
	qty,
	// active,
}: IProps) {
	return useQuery({
		queryKey: [
			'item/list',
			{
				count,
				page,
				limit,
				searchTerm,
				type,
				qty,
				// active,
			},
		],
		queryFn: getItems,
	});
}
