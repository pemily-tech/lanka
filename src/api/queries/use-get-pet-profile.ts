import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '@/services/http-service';
import { type IApiResponse } from '@/types/common';

const getProfileUrl = async ({
	queryKey,
}: QueryFunctionContext<[string, string]>) => {
	const [_key, _params] = queryKey;
	const { data } = await HttpService.get<
		IApiResponse<{ profileUrl: string }>
	>(`/${_key}/${_params}`);
	return data;
};

export function useGetPetProfileImage(id: string) {
	return useQuery({
		queryKey: ['pet/profileUrl', id],
		queryFn: getProfileUrl,
	});
}
