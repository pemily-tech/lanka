import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '@/services/http-service';
import { type IFollowUpRecord } from '@/types/clinic';
import { type IApiResponse } from '@/types/common';

const getFollowups = async ({
	queryKey,
}: QueryFunctionContext<
	[string, string | undefined, string | undefined, string | undefined]
>) => {
	const [_key, type, petId, date] = queryKey;
	const params = new URLSearchParams();
	if (type) params.append('searchType', type);
	if (petId) params.append('petId', petId);
	if (date) params.append('followUpDate', date);
	const url = `/${_key}?${params.toString()}`;

	const { data } =
		await HttpService.get<
			IApiResponse<{ followUpRecords: IFollowUpRecord[] }>
		>(url);
	return data;
};

export function useGetFollows({
	type,
	petId,
	date,
}: {
	type?: 'PENDING' | 'COMPLETE' | 'ALL';
	petId?: string;
	date?: string;
}) {
	return useQuery({
		queryKey: ['clinic/followUpRecords', type, petId, date],
		queryFn: getFollowups,
	});
}
