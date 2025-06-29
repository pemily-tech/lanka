import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../../../../services/http-service';
import { type IApiResponse } from '../../../../../types/common';
import { type IPrescriptionBasicDetails } from '../../../../../types/prescription';

const prescriptionBasicDetails = async ({
	queryKey,
}: QueryFunctionContext<[string, string?]>) => {
	const [_key, id] = queryKey;
	const { data } = await HttpService.get<
		IApiResponse<{ prescriptionBasicDetails: IPrescriptionBasicDetails }>
	>(`/${_key}/${id}`);
	return data;
};

export function useGetPrescriptionBasicDetails(id: string) {
	return useQuery({
		queryKey: ['prescription/basicDetails', id],
		queryFn: prescriptionBasicDetails,
		enabled: !!id,
	});
}
