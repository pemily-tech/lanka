import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { ApiEndpoints } from '../../helpers/primitives';
import { HttpService } from '../../services/http-service';

const getBreed = async ({
	queryKey,
}: QueryFunctionContext<[string, string, string | undefined]>) => {
	const [_key, type, query] = queryKey;
	let url = `${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}?`;
	if (type) {
		url += `type=${type}`;
	}
	if (query) {
		url += `&query=${query}`;
	}
	const { data } = await HttpService.get<
		ICommonTypes.IApiResponse<{
			breeds: { label: string; value: string }[];
		}>
	>(url);
	return data;
};

export function usePetBreed({ type, query }: { type: string; query?: string }) {
	return useQuery({
		queryKey: [ApiEndpoints.PetBreed, type, query],
		queryFn: getBreed,
		enabled: !!type,
	});
}

export default usePetBreed;
