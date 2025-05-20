import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { ApiEndpoints } from '../../helpers/primitives';
import { HttpService } from '../../services/http-service';
import { type IClinicDoctorResponse } from '../../types/clinic';
import { type IApiResponse } from '../../types/common';

import { env } from '@/env.mjs';

const getClinicDoctorById = async ({
	queryKey,
}: QueryFunctionContext<[string, string]>) => {
	const [_key, _params] = queryKey;
	let url = `${env.NEXT_PUBLIC_BASE_PATH}/${_key}?`;
	if (_params && _params.length > 0) {
		url += `doctorId=${_params}`;
	}
	const { data } =
		await HttpService.get<IApiResponse<IClinicDoctorResponse>>(url);
	return data;
};

export function useGetDoctorById(doctorId: string) {
	return useQuery({
		queryKey: [ApiEndpoints.DoctorsClinic, doctorId],
		queryFn: getClinicDoctorById,
		enabled: !!doctorId,
	});
}

export default useGetDoctorById;
