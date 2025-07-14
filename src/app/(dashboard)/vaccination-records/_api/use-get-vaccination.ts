import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '@/services/http-service';
import { type IVaccinationRecord } from '@/types/clinic';
import { type IApiResponse, type IOtherCommonFilter } from '@/types/common';

const getVaccinations = async ({
	queryKey,
}: QueryFunctionContext<
	[
		string,
		string | undefined,
		string | undefined,
		string | undefined,
		string | undefined,
		number | undefined,
	]
>) => {
	const [_key, type, petId, startDate, endDate, page] = queryKey;
	const params = new URLSearchParams();
	if (type) params.append('searchType', type);
	if (petId) params.append('petId', petId);
	if (startDate) params.append('startDate', startDate);
	if (endDate) params.append('endDate', endDate);
	if (!petId) params.append('count', '1');
	if (!petId) params.append('limit', '15');
	if (!petId) params.append('page', page ? String(page) : '0');
	const url = `/${_key}?${params.toString()}`;

	const { data } = await HttpService.get<
		IApiResponse<{
			vaccinationRecords: IVaccinationRecord[];
			totalCount: number;
		}>
	>(url);
	return data;
};

export function useGetVaccinations({
	type,
	petId,
	startDate,
	endDate,
	page,
}: {
	type: IOtherCommonFilter;
	petId?: string;
	startDate?: string;
	endDate?: string;
	page?: number;
}) {
	return useQuery({
		queryKey: [
			'clinic/vaccinationRecords',
			type,
			petId,
			startDate,
			endDate,
			page,
		],
		queryFn: getVaccinations,
	});
}
