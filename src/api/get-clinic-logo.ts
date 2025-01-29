import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { ApiEndpoints } from '../helpers/primitives';
import { HttpService } from '../services/http-service';

const getClinicLogo = async ({ queryKey }: QueryFunctionContext<[string]>) => {
	const [_key] = queryKey;
	const url = `${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}`;
	const { data } =
		await HttpService.get<ICommonTypes.IApiResponse<{ logoUrl: string }>>(
			url
		);
	return data;
};

export function useGetClinicLogo() {
	return useQuery({
		queryKey: [ApiEndpoints.ClinicLogo],
		queryFn: getClinicLogo,
	});
}

export default useGetClinicLogo;
