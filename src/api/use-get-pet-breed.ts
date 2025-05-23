import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '@/services/http-service';
import { type IApiResponse } from '@/types/common';

const getBreed = async ({
	queryKey,
}: QueryFunctionContext<[string, string, string | undefined]>) => {
	const [_key, type, query] = queryKey;
	let url = `/${_key}?`;
	if (type) {
		url += `type=${type}`;
	}
	if (query) {
		url += `&query=${query}`;
	}
	const { data } = await HttpService.get<
		IApiResponse<{
			breeds: { label: string; value: string }[];
		}>
	>(url);
	return data;
};

export function useGetPetBreed({
	type,
	query,
}: {
	type: string;
	query?: string;
}) {
	return useQuery({
		queryKey: ['app/utils/breeds', type, query],
		queryFn: getBreed,
		enabled: !!type,
	});
}
