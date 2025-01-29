import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { ApiEndpoints } from '../../helpers/primitives';
import { HttpService } from '../../services/http-service';

const getClinicDoctors = async ({
	queryKey,
}: QueryFunctionContext<[string]>) => {
	const [_key] = queryKey;
	const url = `${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}?`;
	const { data } =
		await HttpService.get<
			ICommonTypes.IApiResponse<IClinicTypes.IClinicDoctorResponse>
		>(url);
	return data;
};

export function useGetDoctors() {
	return useQuery({
		queryKey: [ApiEndpoints.DoctorsClinic],
		queryFn: getClinicDoctors,
	});
}

export default useGetDoctors;
