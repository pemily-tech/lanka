import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../services/http-service';
import { type IApiResponse, type IGetPetsResponse } from '../types/common';

const getSignature = async ({
	queryKey,
}: QueryFunctionContext<[string, string]>) => {
	const [_key, doctorId] = queryKey;
	const { data } = await HttpService.get<
		IApiResponse<{ signatureUrl: string }>
	>(`${_key}/${doctorId}`);
	return data;
};

export function useGetDoctorSignature({ doctorId }: { doctorId: string }) {
	return useQuery({
		queryKey: ['clinic/signatureUrl', doctorId],
		queryFn: getSignature,
		enabled: !!doctorId,
	});
}
