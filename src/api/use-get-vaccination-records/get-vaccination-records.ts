import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { ApiEndpoints } from '../../helpers/primitives';
import { HttpService } from '../../services/http-service';
import { type IClinicVaccinationRecordsApiResponse } from '../../types/clinic';
import { type IApiResponse } from '../../types/common';

import { env } from '@/env.mjs';

const getVaccinationRecords = async ({
	queryKey,
}: QueryFunctionContext<
	[string, string, string | undefined, string | undefined]
>) => {
	const [_key, type, petId, date] = queryKey;
	let url = `${env.NEXT_PUBLIC_BASE_PATH}/${_key}?`;
	if (type !== '' && type !== 'ALL') {
		url += `searchType=${type}`;
	}
	if (petId) {
		url += `&petId=${petId}`;
	}
	if (date) {
		url += `&vaccinationDate=${date}`;
	}
	const { data } =
		await HttpService.get<
			IApiResponse<IClinicVaccinationRecordsApiResponse>
		>(url);
	return data;
};

export function useGetVaccinationRecords({
	type,
	petId,
	date,
}: {
	type: string;
	petId?: string;
	date?: string | undefined;
}) {
	return useQuery({
		queryKey: [ApiEndpoints.ClinicVaccinationRecords, type, petId, date],
		queryFn: getVaccinationRecords,
	});
}

export default useGetVaccinationRecords;
