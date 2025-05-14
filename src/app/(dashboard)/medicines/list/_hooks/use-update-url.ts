import { useQueryStates } from 'nuqs';

export const useUpdateUrl = () => {
	const [{ page, limit, active }, setQuery] = useQueryStates({
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
		active: {
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

	const setActive = (active: number) => {
		setQuery({ active, page: 0, limit });
	};

	return {
		page,
		limit,
		active,
		handlePagination,
		updateQueryParams,
		setLimit,
		setActive,
	};
};
