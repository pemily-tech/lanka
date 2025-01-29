import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { ApiEndpoints } from '../../helpers/primitives';
import { HttpService } from '../../services/http-service';

const getFollowupRecords = async ({
	queryKey,
}: QueryFunctionContext<
	[string, string | undefined, string | undefined, string | undefined]
>) => {
	const [_key, type, petId, date] = queryKey;
	let url = `${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}?`;
	if (type) {
		url += `&searchType=${type}`;
	}
	if (petId) {
		url += `&petId=${petId}`;
	}
	if (date) {
		url += `&followUpDate=${date}`;
	}
	const { data } =
		await HttpService.get<
			ICommonTypes.IApiResponse<IClinicTypes.IClinicFolowupRecordsApiResponse>
		>(url);
	return data;
};

export function useGetFollowRecords({
	type,
	petId,
	date,
}: {
	type?: string;
	petId?: string;
	date?: string;
}) {
	return useQuery({
		queryKey: [ApiEndpoints.ClinicFollowupRecords, type, petId, date],
		queryFn: getFollowupRecords,
	});
}

export default useGetFollowRecords;
