import {
	keepPreviousData,
	type QueryFunctionContext,
	useQuery,
} from '@tanstack/react-query';

import { HttpService } from '../../services/http-service';
import { type IPetParentsApiResponse } from '../../types/clinic';
import { type IApiResponse } from '../../types/common';

import { env } from '@/env.mjs';

const getPetParentsList = async ({
	queryKey,
}: QueryFunctionContext<[string, string, number]>) => {
	const [_key, searchTerm, limit] = queryKey;

	let url = `${env.NEXT_PUBLIC_BASE_PATH}/${_key}?page=0&limit=${limit}`;

	if (searchTerm && searchTerm.length > 2) {
		url += `&searchTerm=${searchTerm}`;
	}

	const { data } =
		await HttpService.get<IApiResponse<IPetParentsApiResponse>>(url);

	return data;
};

export function useGetPetParents({
	apiKey,
	searchTerm,
	limit,
}: {
	apiKey: string;
	searchTerm: string;
	limit: number;
}) {
	return useQuery({
		queryKey: [apiKey, searchTerm, limit],
		queryFn: getPetParentsList,
		placeholderData: keepPreviousData,
	});
}
