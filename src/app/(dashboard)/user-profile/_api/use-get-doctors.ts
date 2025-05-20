import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '@/services/http-service';
import { type IClinicDoctorResponse } from '@/types/clinic';
import { type IApiResponse } from '@/types/common';

const getClinicDoctors = async ({
	queryKey,
}: QueryFunctionContext<[string]>) => {
	const [_key] = queryKey;
	const { data } =
		await HttpService.get<IApiResponse<IClinicDoctorResponse>>(_key);
	return data;
};

export function useGetDoctors() {
	return useQuery({
		queryKey: ['clinic/doctors'],
		queryFn: getClinicDoctors,
	});
}

export default useGetDoctors;
