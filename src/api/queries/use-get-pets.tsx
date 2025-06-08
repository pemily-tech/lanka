import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../services/http-service';
import { type IApiResponse, type IPetItem } from '../../types/common';

const getPets = async ({
	queryKey,
}: QueryFunctionContext<[string, string, string?]>) => {
	const [_key, parentId, search] = queryKey;
	const url = `/${_key}/${parentId}${search ? `?search=${search}` : ''}`;
	const { data } =
		await HttpService.get<IApiResponse<{ pets: IPetItem[] }>>(url);
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
