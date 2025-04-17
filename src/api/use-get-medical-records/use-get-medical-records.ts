import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { ApiEndpoints } from '../../helpers/primitives';
import { HttpService } from '../../services/http-service';
import { type IClinicMedicalRecordsApiResponse } from '../../types/clinic';
import { type IApiResponse } from '../../types/common';

import { env } from '@/env.mjs';

const getMedicalRecords = async ({
	queryKey,
}: QueryFunctionContext<
	[string, string, string | undefined, string | undefined]
>) => {
	const [_key, type, petId, date] = queryKey;
	let url = `${env.NEXT_PUBLIC_BASE_PATH}/${_key}?type=${type}`;
	if (petId) {
		url += `&petId=${petId}`;
	}
	if (date) {
		url += `&uploadDate=${date}`;
	}
	const { data } =
		await HttpService.get<IApiResponse<IClinicMedicalRecordsApiResponse>>(
			url
		);
	return data;
};

export function useGetMedicalRecords({
	type,
	petId,
	date,
}: {
	type: string;
	petId?: string | undefined;
	date?: string | undefined;
}) {
	return useQuery({
		queryKey: [ApiEndpoints.ClinicMedicalRecords, type, petId, date],
		queryFn: getMedicalRecords,
	});
}

export default useGetMedicalRecords;
