import { useQueryStates } from 'nuqs';

export const useUpdateUrl = () => {
	const [{ page, limit, active, commonFilter }, setQuery] = useQueryStates({
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
		commonFilter: {
			defaultValue: 'PENDING',
			parse: (val) => val as 'PENDING' | 'COMPLETE' | 'ALL',
			serialize: (val) => val,
		},
	});

	const updateQueryParams = (
		updates: Partial<{
			page: number;
			limit: number;
			mop: string | null;
			commonFilter: 'PENDING' | 'COMPLETE' | 'ALL';
		}>
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

	const setCommonFilter = (filter: 'PENDING' | 'COMPLETE' | 'ALL') => {
		setQuery({ commonFilter: filter, page: 0 });
	};

	return {
		page,
		limit,
		active,
		commonFilter,
		handlePagination,
		updateQueryParams,
		setLimit,
		setActive,
		setCommonFilter,
	};
};
