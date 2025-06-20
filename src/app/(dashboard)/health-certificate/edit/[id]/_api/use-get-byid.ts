import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '@/services/http-service';
import { type IApiResponse } from '@/types/common';
import { type ICertificate } from '@/types/health-certificate';

const certificateById = async ({
	queryKey,
}: QueryFunctionContext<[string, string]>) => {
	const [_key, id] = queryKey;
	const { data } = await HttpService.get<
		IApiResponse<{ certificate: ICertificate }>
	>(`/${_key}/${id}`);
	return data;
};

export function useGetCertificateById(id: string) {
	return useQuery({
		queryKey: ['certificate/byNo', id],
		queryFn: certificateById,
		enabled: !!id,
	});
}
