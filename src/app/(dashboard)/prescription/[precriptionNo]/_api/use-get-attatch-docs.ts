import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '../../../../../services/http-service';
import { type IApiResponse } from '../../../../../types/common';
import { type IAttachedDocuments } from './../../../../../types/prescription';

const getAttachDocs = async ({
	queryKey,
}: QueryFunctionContext<[string, string, string]>) => {
	const [_key, id, type] = queryKey;
	const { data } = await HttpService.get<
		IApiResponse<{ attachedDocuments: IAttachedDocuments }>
	>(`/${_key}/${id}?type=${type}`);
	return data;
};

export function useGetAttatchDocs(id: string, type: string) {
	return useQuery({
		queryKey: ['prescription/attachedDocuments', id, type],
		queryFn: getAttachDocs,
		enabled: !!id,
	});
}
