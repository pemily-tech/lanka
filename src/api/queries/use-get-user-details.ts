import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '@/services/http-service';
import { type IApiResponse, type IUserDetails } from '@/types/common';

const getUser = async ({
	queryKey,
}: QueryFunctionContext<[string, string | undefined]>) => {
	const [_key, _params] = queryKey;
	const { data } = await HttpService.get<
		IApiResponse<{ user: IUserDetails }>
	>(`/${_key}/${_params}`);
	return data;
};

export function useGetUser(id?: string) {
	return useQuery({
		queryKey: ['user/userId', id],
		queryFn: getUser,
		enabled: !!id,
	});
}
