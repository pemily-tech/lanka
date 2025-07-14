import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '@/services/http-service';
import { type IFollowUpRecord } from '@/types/clinic';
import { type IApiResponse, type IOtherCommonFilter } from '@/types/common';

const getFollowups = async ({
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
	if (!petId) params.append('limit', '30');
	if (!petId) params.append('page', page ? String(page) : '0');
	const url = `/${_key}?${params.toString()}`;

	const { data } = await HttpService.get<
		IApiResponse<{
			followUpRecords: IFollowUpRecord[];
			totalCount: number;
		}>
	>(url);
	return data;
};

export function useGetFollows({
	type,
	petId,
	startDate,
	endDate,
	page,
}: {
	type?: IOtherCommonFilter;
	petId?: string;
	startDate?: string;
	endDate?: string;
	page?: number;
}) {
	return useQuery({
		queryKey: [
			'clinic/followUpRecords',
			type,
			petId,
			startDate,
			endDate,
			page,
		],
		queryFn: getFollowups,
	});
}
