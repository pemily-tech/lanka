import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { ApiEndpoints } from '../../helpers/primitives';
import { HttpService } from '../../services/http-service';
import { type IApiResponse } from '../../types/common';
import { type IGetUserResponse } from '../../types/user';

import { env } from '@/env.mjs';

const getUser = async ({
	queryKey,
}: QueryFunctionContext<[string, string | undefined]>) => {
	const [_key, _params] = queryKey;
	const { data } = await HttpService.get<IApiResponse<IGetUserResponse>>(
		`${env.NEXT_PUBLIC_BASE_PATH}/${_key}/${_params}`
	);
	return data;
};

export function useGetUser(id?: string) {
	return useQuery({
		queryKey: [ApiEndpoints.UserId, id],
		queryFn: getUser,
		enabled: !!id,
	});
}
