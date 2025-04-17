import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { ApiEndpoints } from '../../helpers/primitives';
import { HttpService } from '../../services/http-service';
import { type IClinicStaffResponse } from '../../types/clinic';
import { type IApiResponse } from '../../types/common';

import { env } from '@/env.mjs';

const staffList = async ({ queryKey }: QueryFunctionContext<[string]>) => {
	const [_key] = queryKey;
	const url = `${env.NEXT_PUBLIC_BASE_PATH}/${_key}?`;
	const { data } =
		await HttpService.get<IApiResponse<IClinicStaffResponse>>(url);
	return data;
};

export function useGetStaff() {
	return useQuery({
		queryKey: [ApiEndpoints.StaffList],
		queryFn: staffList,
	});
}

export default useGetStaff;
