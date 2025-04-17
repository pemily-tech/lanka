import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { ApiEndpoints } from '../../helpers/primitives';
import { HttpService } from '../../services/http-service';
import { type IClinicStaffResponse } from '../../types/clinic';
import { type IApiResponse } from '../../types/common';

import { env } from '@/env.mjs';

const getClinicStaffById = async ({
	queryKey,
}: QueryFunctionContext<[string, string]>) => {
	const [_key, _params] = queryKey;
	let url = `${env.NEXT_PUBLIC_BASE_PATH}/${_key}?`;
	if (_params && _params.length > 0) {
		url += `staffId=${_params}`;
	}
	const { data } =
		await HttpService.get<IApiResponse<IClinicStaffResponse>>(url);
	return data;
};

export function useGetStaffById(staffId: string) {
	return useQuery({
		queryKey: [ApiEndpoints.StaffList, staffId],
		queryFn: getClinicStaffById,
		enabled: !!staffId,
	});
}

export default useGetStaffById;
