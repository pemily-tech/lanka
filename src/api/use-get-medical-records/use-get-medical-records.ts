import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { ApiEndpoints } from '../../helpers/primitives';
import { HttpService } from '../../services/http-service';

const getMedicalRecords = async ({
	queryKey,
}: QueryFunctionContext<
	[string, string, string | undefined, string | undefined]
>) => {
	const [_key, type, petId, date] = queryKey;
	let url = `${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}?type=${type}`;
	if (petId) {
		url += `&petId=${petId}`;
	}
	if (date) {
		url += `&uploadDate=${date}`;
	}
	const { data } =
		await HttpService.get<
			ICommonTypes.IApiResponse<IClinicTypes.IClinicMedicalRecordsApiResponse>
		>(url);
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
