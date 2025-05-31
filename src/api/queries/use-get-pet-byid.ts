import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '@/services/http-service';
import {
	type IApiResponse,
	type IGetPetByIdResponse,
	type IPetItem,
} from '@/types/common';

const getPetById = async ({
	queryKey,
}: QueryFunctionContext<[string, string]>) => {
	const [_key, _params] = queryKey;
	const { data } = await HttpService.get<IApiResponse<{ pet: IPetItem }>>(
		`/${_key}/${_params}`
	);
	return data;
};

export function useGetPetById(petId: string) {
	return useQuery({
		queryKey: ['pet/id', petId],
		queryFn: getPetById,
		enabled: !!petId,
	});
}
