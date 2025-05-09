import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { ApiEndpoints } from '../helpers/primitives';
import { HttpService } from '../services/http-service';
import { type IApiResponse } from '../types/common';

import { env } from '@/env.mjs';

const getUserProfileUrl = async ({
	queryKey,
}: QueryFunctionContext<[string, string]>) => {
	const [_key, _params] = queryKey;
	const { data } = await HttpService.get<
		IApiResponse<{ profileUrl: string }>
	>(`${env.NEXT_PUBLIC_BASE_PATH}/${_key}/${_params}`);
	return data;
};

export function useGetUserProfileUrl(id: string) {
	return useQuery({
		queryKey: ['user/profileUrl', id],
		queryFn: getUserProfileUrl,
	});
}
