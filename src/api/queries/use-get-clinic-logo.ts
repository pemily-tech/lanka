import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../services/http-service';
import { type IApiResponse } from '../../types/common';

const getClinicLogo = async ({ queryKey }: QueryFunctionContext<[string]>) => {
	const [_key] = queryKey;
	const url = `/${_key}`;
	const { data } =
		await HttpService.get<IApiResponse<{ logoUrl: string }>>(url);
	return data;
};

export function useGetClinicLogo() {
	return useQuery({
		queryKey: ['clinic/logoUrl'],
		queryFn: getClinicLogo,
	});
}
