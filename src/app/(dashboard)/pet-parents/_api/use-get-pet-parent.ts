import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';
import qs from 'qs';

import { HttpService } from '../../../../services/http-service';
import { type IPetParent } from '../../../../types/clinic';
import { type IApiResponse } from '../../../../types/common';

interface IProps {
	page?: number;
	limit?: number;
	searchTerm: string;
	count: 0 | 1;
}

const getPetParentsList = async ({
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
			IApiResponse<{ parents: IPetParent[]; totalCount: number }>
		>(url);

	return data;
};

export function useGetPetParentsList({
	searchTerm,
	limit = 15,
	page = 0,
	count = 0,
}: {
	searchTerm: string;
	limit: number;
	page: number;
	count: 0 | 1;
}) {
	return useQuery({
		queryKey: ['clinic/parents', { searchTerm, limit, page, count }],
		queryFn: getPetParentsList,
	});
}
