import { useCallback } from 'react';

import useGetFollowRecords from '../../../../api/use-get-follow-records/get-follow-records';

interface IProps {
	activeFilter: string;
	petId: string;
	selectedDate: string;
}

export default function useRecord({
	activeFilter,
	petId,
	selectedDate,
}: IProps) {
	const { data, isPending, refetch } = useGetFollowRecords({
		type: activeFilter,
		...(petId ? { petId } : { date: selectedDate }),
	});

	const handleRefetch = useCallback(() => {
		refetch();
	}, []);

	return {
		followUpRecords: data?.data?.followUpRecords,
		isPending,
		refetch: handleRefetch,
	};
}
