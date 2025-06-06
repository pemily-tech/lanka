import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../services/http-service';
import { type IApiResponse, type IGetPetsResponse } from '../types/common';

import { env } from '@/env.mjs';

const getPets = async ({
	queryKey,
}: QueryFunctionContext<[string, string, string?]>) => {
	const [_key, parentId, search] = queryKey;
	const url = `${env.NEXT_PUBLIC_BASE_PATH}/${_key}/${parentId}${search ? `?search=${search}` : ''}`;
	const { data } = await HttpService.get<IApiResponse<IGetPetsResponse>>(url);
	return data;
};

export function useGetPets({
	parentId,
	search,
}: {
	parentId: string;
	search?: string;
}) {
	return useQuery({
		queryKey: ['pet/me', parentId, search ?? ''],
		queryFn: getPets,
	});
}

export default useGetPets;
