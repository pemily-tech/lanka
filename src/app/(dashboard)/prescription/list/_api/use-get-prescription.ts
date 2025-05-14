import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';
import qs from 'qs';

import { HttpService } from '../../../../../services/http-service';
import { type IApiResponse } from '../../../../../types/common';
import { type IPrescription } from '../../../../../types/prescription';

import { env } from '@/env.mjs';

interface IProps {
	count?: 0 | 1;
	page?: number;
	limit?: number;
	startDate: string;
	endDate: string;
	active: number;
}

const getPrescriptions = async ({
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

	const url = `${env.NEXT_PUBLIC_BASE_PATH}/${key}?${query}`;

	const { data } =
		await HttpService.get<
			IApiResponse<{ prescriptions: IPrescription[]; totalCount: number }>
		>(url);

	return data;
};

export function useGetPrescriptions({
	count = 0,
	page = 0,
	limit = 15,
	active = 1,
	startDate,
	endDate,
}: IProps) {
	return useQuery({
		queryKey: [
			'prescription/list',
			{
				count,
				page,
				limit,
				active,
				startDate,
				endDate,
			},
		],
		queryFn: getPrescriptions,
	});
}
