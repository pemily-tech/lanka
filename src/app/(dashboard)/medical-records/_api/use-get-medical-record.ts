import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '@/services/http-service';
import { type IMedicalRecord } from '@/types/clinic';
import { type IApiResponse } from '@/types/common';

type IFilter = 'PRESCRIPTION' | 'REPORT' | 'DIET' | 'OTHER';

const getMedicalRecord = async ({
	queryKey,
}: QueryFunctionContext<
	[string, string | undefined, string | undefined, string | undefined]
>) => {
	const [_key, type, petId, date] = queryKey;
	const params = new URLSearchParams();
	if (type) params.append('type', type);
	if (petId) params.append('petId', petId);
	if (date) params.append('uploadDate', date);
	const url = `/${_key}?${params.toString()}`;

	const { data } =
		await HttpService.get<
			IApiResponse<{ medicalRecords: IMedicalRecord[] }>
		>(url);
	return data;
};

export function useGetMedicalRecord({
	type,
	petId,
	date,
}: {
	type?: IFilter;
	petId?: string;
	date?: string;
}) {
	return useQuery({
		queryKey: ['clinic/medicalRecords', type, petId, date],
		queryFn: getMedicalRecord,
	});
}
