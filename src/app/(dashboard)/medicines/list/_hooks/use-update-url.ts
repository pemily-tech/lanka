import { useQueryStates } from 'nuqs';

export const useUpdateUrl = () => {
	const [{ page, limit, count }, setQuery] = useQueryStates({
		page: {
			defaultValue: 0,
			parse: Number,
			serialize: String,
		},
		limit: {
			defaultValue: 15,
			parse: Number,
			serialize: String,
		},
		count: {
			defaultValue: 1,
			parse: Number,
			serialize: String,
		},
	});

	const updateQueryParams = (
		updates: Partial<{ page: number; limit: number; mop: string | null }>
	) => {
		setQuery(updates);
	};

	const handlePagination = (newPage: number | 'next' | 'prev') => {
		const nextPage =
			typeof newPage === 'number'
				? newPage
				: page + (newPage === 'next' ? 1 : -1);
		setQuery({ page: nextPage });
	};

	const setLimit = (newLimit: number) => {
		setQuery({ limit: newLimit, page: 0 });
	};

	return {
		handlePagination,
		updateQueryParams,
		page,
		limit,
		setLimit,
		count,
	};
};
