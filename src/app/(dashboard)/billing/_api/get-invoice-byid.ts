import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../../../services/http-service';
import { type IApiResponse } from '../../../../types/common';
import { type IInvoice } from '../../../../types/invoice';

import { env } from '@/env.mjs';

const getInvoiceById = async ({
	queryKey,
}: QueryFunctionContext<[string, string]>) => {
	const [_key, _params] = queryKey;

	const url = `${env.NEXT_PUBLIC_BASE_PATH}/${_key}/${_params}`;

	const { data } = await HttpService.get<
		IApiResponse<{
			invoice: IInvoice;
		}>
	>(url);

	return data;
};

export function useGetInvoiceById(invoiceNo: string) {
	return useQuery({
		queryKey: ['invoice/byNo', invoiceNo],
		queryFn: getInvoiceById,
	});
}
