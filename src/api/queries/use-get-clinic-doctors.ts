import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../services/http-service';
import { type IClinicDoctorResponse } from '../../types/clinic';
import { type IApiResponse } from '../../types/common';

import { env } from '@/env.mjs';

const getClinicDoctors = async ({
	queryKey,
}: QueryFunctionContext<[string, string?]>) => {
	const [_key, search] = queryKey;
	const url = `${env.NEXT_PUBLIC_BASE_PATH}/${_key}${search ? `?search=${search}` : ''}`;
	const { data } =
		await HttpService.get<IApiResponse<IClinicDoctorResponse>>(url);
	return data;
};

export function useGetClinicDoctors({ search }: { search?: string }) {
	return useQuery({
		queryKey: ['clinic/doctors', search ?? ''],
		queryFn: getClinicDoctors,
	});
}
