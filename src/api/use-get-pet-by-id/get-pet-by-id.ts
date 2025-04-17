import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { ApiEndpoints } from '../../helpers/primitives';
import { HttpService } from '../../services/http-service';
import {
	type IApiResponse,
	type IGetPetByIdResponse,
} from '../../types/common';

import { env } from '@/env.mjs';

const getPetById = async ({
	queryKey,
}: QueryFunctionContext<[string, string]>) => {
	const [_key, _params] = queryKey;
	const { data } = await HttpService.get<IApiResponse<IGetPetByIdResponse>>(
		`${env.NEXT_PUBLIC_BASE_PATH}/${_key}/${_params}`
	);
	return data;
};

export function useGetPetById(petId: string) {
	return useQuery({
		queryKey: [ApiEndpoints.PetId, petId],
		queryFn: getPetById,
		enabled: !!petId,
	});
}

export default useGetPetById;
