'use client';

import { type Params } from 'next/dist/server/request/params';
import {
	useParams,
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation';

export interface UseRouterQuery {
	query: Params; // Type for `useParams` result
	back: () => void;
	router: ReturnType<typeof useRouter>;
	pathname: string;
	params: URLSearchParams; // Type for `useSearchParams` result
	updateQueryParams: (args: { key: string; value: string }) => void; // Explicit type
}

export function useRouterQuery(): UseRouterQuery {
	const router = useRouter();
	const searchParams = useSearchParams(); // Returns URLSearchParams instance
	const pathName = usePathname(); // Returns the current path
	const params = useParams(); // Returns a Record<string, string | undefined>

	const updateQueryParams = ({
		key,
		value,
	}: {
		key: string;
		value: string;
	}) => {
		const currentParams = new URLSearchParams(searchParams.toString());
		currentParams.set(key, value);
		// Use `replace` to avoid page reload and retain scroll position
		router.replace(`${pathName}?${currentParams.toString()}`, {
			scroll: true,
		});
	};

	return {
		query: params, // `useParams` result
		router, // `useRouter` result
		back: router.back, // Back navigation
		pathname: pathName, // Current pathname
		params: searchParams, // URLSearchParams
		updateQueryParams, // Utility function
	};
}

export default useRouterQuery;
