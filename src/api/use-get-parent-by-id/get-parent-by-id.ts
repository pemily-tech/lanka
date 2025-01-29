import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../services/http-service';

const getParentById = async ({
	queryKey,
}: QueryFunctionContext<[string, string]>) => {
	const [_key, _params] = queryKey;
	const url = `${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}?parentId=${_params}`;
	const { data } =
		await HttpService.get<
			ICommonTypes.IApiResponse<IClinicTypes.IPetParentsApiResponse>
		>(url);
	return data;
};

export function useGetParentById(parentId: string) {
	return useQuery({
		queryKey: ['clinic/parents', parentId],
		queryFn: getParentById,
		enabled: !!parentId,
	});
}

export default useGetParentById;
