import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../../../services/http-service';

const getInvoiceById = async ({
	queryKey,
}: QueryFunctionContext<[string, string]>) => {
	const [_key, _params] = queryKey;

	const url = `${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}/${_params}`;

	const { data } = await HttpService.get<
		ICommonTypes.IApiResponse<{
			invoice: IInvoiceTypes.IInvoice;
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
