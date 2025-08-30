import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '@/services/http-service';
import { type IInvoice } from '@/types/bills-items';
import { type IApiResponse } from '@/types/common';

const invoiceByNo = async ({
	queryKey,
}: QueryFunctionContext<[string, string]>) => {
	const [_key, id] = queryKey;
	const { data } = await HttpService.get<IApiResponse<{ invoice: IInvoice }>>(
		`/${_key}/${id}`
	);
	return data;
};

export function useGetInvoiceByNo(id: string) {
	return useQuery({
		queryKey: ['invoice/byNo', id],
		queryFn: invoiceByNo,
		enabled: !!id,
	});
}
