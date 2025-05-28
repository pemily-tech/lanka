import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '@/services/http-service';
import { type IApiResponse } from '@/types/common';

const getFollowupList = async ({
	queryKey,
}: QueryFunctionContext<[string]>) => {
	const [_key] = queryKey;
	const { data } = await HttpService.get<
		IApiResponse<{
			followup: { label: string; value: string }[];
		}>
	>(_key);
	return data;
};

export function useGetFollowupList() {
	return useQuery({
		queryKey: ['app/utils/follow-list'],
		queryFn: getFollowupList,
	});
}
