import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { ApiEndpoints } from '../helpers/primitives';
import { HttpService } from '../services/http-service';
import { type IApiResponse } from '../types/common';

import { env } from '@/env.mjs';

const getClinicLogo = async ({ queryKey }: QueryFunctionContext<[string]>) => {
	const [_key] = queryKey;
	const url = `${env.NEXT_PUBLIC_BASE_PATH}/${_key}`;
	const { data } =
		await HttpService.get<IApiResponse<{ logoUrl: string }>>(url);
	return data;
};

export function useGetClinicLogo() {
	return useQuery({
		queryKey: [ApiEndpoints.ClinicLogo],
		queryFn: getClinicLogo,
	});
}

export default useGetClinicLogo;
