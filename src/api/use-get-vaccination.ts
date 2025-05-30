import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '@/services/http-service';
import { type IVaccinationRecord } from '@/types/clinic';
import { type IApiResponse } from '@/types/common';

const getVaccinations = async ({
	queryKey,
}: QueryFunctionContext<
	[string, string, string | undefined, string | undefined]
>) => {
	const [_key, type, petId, date] = queryKey;
	const params = new URLSearchParams();
	if (type) params.append('searchType', type);
	if (petId) params.append('petId', petId);
	if (date) params.append('vaccinationDate', date);
	const url = `/${_key}?${params.toString()}`;

	const { data } =
		await HttpService.get<
			IApiResponse<{ vaccinationRecords: IVaccinationRecord[] }>
		>(url);
	return data;
};

export function useGetVaccinations({
	type,
	petId,
	date,
}: {
	type: string;
	petId?: string;
	date?: string | undefined;
}) {
	return useQuery({
		queryKey: ['clinic/vaccinationRecords', type, petId, date],
		queryFn: getVaccinations,
	});
}
