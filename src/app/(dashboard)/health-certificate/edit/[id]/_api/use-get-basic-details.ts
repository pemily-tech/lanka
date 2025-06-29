import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '@/services/http-service';
import { type IApiResponse } from '@/types/common';
import { type ICertificateBasicDetails } from '@/types/health-certificate';

const certificateBasicDetails = async ({
	queryKey,
}: QueryFunctionContext<[string, string?]>) => {
	const [_key, id] = queryKey;
	const { data } = await HttpService.get<
		IApiResponse<{ certificateBasicDetails: ICertificateBasicDetails }>
	>(`/${_key}/${id}`);
	return data;
};

export function useGetCertificateBasicDetails(id: string) {
	return useQuery({
		queryKey: ['certificate/basicDetails', id],
		queryFn: certificateBasicDetails,
		enabled: !!id,
	});
}
