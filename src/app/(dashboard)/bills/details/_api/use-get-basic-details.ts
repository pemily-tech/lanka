import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '@/services/http-service';
import { type IInvoiceBasicDetails } from '@/types/bills-items';
import { type IApiResponse } from '@/types/common';

const invoiceBasicDetails = async ({
	queryKey,
}: QueryFunctionContext<[string, string]>) => {
	const [_key, id] = queryKey;
	const { data } = await HttpService.get<
		IApiResponse<{ invoiceBasicDetails: IInvoiceBasicDetails }>
	>(`/${_key}/${id}`);
	return data;
};

export function useGetInvoiceBasicDetails(id: string) {
	return useQuery({
		queryKey: ['invoice/basicDetails', id],
		queryFn: invoiceBasicDetails,
		enabled: !!id,
	});
}
