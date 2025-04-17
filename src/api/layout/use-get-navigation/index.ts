import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { type INavigationItem } from '../../../types/common';

const getNavigation = async ({ queryKey }: QueryFunctionContext<[string]>) => {
	const [_key] = queryKey;
	const response = await fetch(_key);
	const data = await response.json();
	return data as { data: INavigationItem[] };
};

export function useGetNavigation() {
	return useQuery({
		queryKey: ['/api/navigation'],
		queryFn: getNavigation,
	});
}
