import {
	keepPreviousData,
	type QueryFunctionContext,
	useQuery,
} from '@tanstack/react-query';

import { HttpService } from '../../../../services/http-service';

const getPetParentsList = async ({
	queryKey,
}: QueryFunctionContext<[string, string, number]>) => {
	const [_key, searchTerm, limit] = queryKey;

	let url = `${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}?page=0&limit=${limit}`;

	if (searchTerm && searchTerm.length > 2) {
		url += `&searchTerm=${searchTerm}`;
	}

	const { data } =
		await HttpService.get<
			ICommonTypes.IApiResponse<IClinicTypes.IPetParentsApiResponse>
		>(url);

	return data;
};

export function useGetPetParentsList({
	apiKey,
	searchTerm,
	limit,
}: {
	apiKey: string;
	searchTerm: string;
	limit: number;
}) {
	return useQuery({
		queryKey: [apiKey, searchTerm, limit],
		queryFn: getPetParentsList,
		placeholderData: keepPreviousData,
	});
}
