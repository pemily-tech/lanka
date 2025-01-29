import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

const getNavigation = async ({ queryKey }: QueryFunctionContext<[string]>) => {
	const [_key] = queryKey;
	const response = await fetch(_key);
	const data = await response.json();
	return data as { data: ICommonTypes.INavigationItem[] };
};

export function useGetNavigation() {
	return useQuery({
		queryKey: ['/api/navigation'],
		queryFn: getNavigation,
	});
}
