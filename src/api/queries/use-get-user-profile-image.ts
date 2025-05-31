import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../services/http-service';
import { type IApiResponse } from '../../types/common';

const getUserProfileUrl = async ({
	queryKey,
}: QueryFunctionContext<[string, string]>) => {
	const [_key, _params] = queryKey;
	const { data } = await HttpService.get<
		IApiResponse<{ profileUrl: string }>
	>(`/${_key}/${_params}`);
	return data;
};

export function useGetUserProfileUrl(id: string) {
	return useQuery({
		queryKey: ['user/profileUrl', id],
		queryFn: getUserProfileUrl,
	});
}
