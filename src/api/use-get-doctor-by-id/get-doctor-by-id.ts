import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { ApiEndpoints } from '../../helpers/primitives';
import { HttpService } from '../../services/http-service';

const getClinicDoctorById = async ({
	queryKey,
}: QueryFunctionContext<[string, string]>) => {
	const [_key, _params] = queryKey;
	let url = `${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}?`;
	if (_params && _params.length > 0) {
		url += `doctorId=${_params}`;
	}
	const { data } =
		await HttpService.get<
			ICommonTypes.IApiResponse<IClinicTypes.IClinicDoctorResponse>
		>(url);
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
