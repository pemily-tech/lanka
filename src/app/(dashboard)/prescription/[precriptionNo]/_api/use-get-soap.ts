import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../../../../services/http-service';
import { type IApiResponse } from '../../../../../types/common';
import { type ISoap } from './../../../../../types/prescription';

const prescriptionSoap = async ({
	queryKey,
}: QueryFunctionContext<[string, string]>) => {
	const [_key, id] = queryKey;
	const { data } = await HttpService.get<
		IApiResponse<{ soap: { prescriptionNo: string; soap: ISoap } }>
	>(`/${_key}/${id}`);
	return data;
};

export function useGetPrescriptionSoap(id: string) {
	return useQuery({
		queryKey: ['prescription/soap', id],
		queryFn: prescriptionSoap,
		enabled: !!id,
	});
}
