import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';
import qs from 'qs';

import { HttpService } from '../../../../../services/http-service';
import { type IApiResponse } from '../../../../../types/common';
import { type IMedicine } from '../../../../../types/prescription';

interface IProps {
	count?: 0 | 1;
	page?: number;
	limit?: number;
	searchTerm?: string;
	enabled?: boolean;
	active?: number;
}

const getMedicines = async ({
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
			IApiResponse<{ medicines: IMedicine[]; totalCount: number }>
		>(url);

	return data;
};

export function useGetMedicines({
	count = 0,
	page = 0,
	limit = 15,
	searchTerm,
	enabled,
	active = 1,
}: IProps) {
	return useQuery({
		queryKey: [
			'medicine/list',
			{
				count,
				page,
				limit,
				searchTerm,
				active,
			},
		],
		queryFn: getMedicines,
		enabled,
	});
}
