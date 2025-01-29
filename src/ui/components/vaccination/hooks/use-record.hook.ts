import { useCallback } from 'react';

import useGetVaccinationRecords from '../../../../api/use-get-vaccination-records/get-vaccination-records';

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
	const { data, isPending, refetch } = useGetVaccinationRecords({
		type: activeFilter,
		...(petId ? { petId } : { date: selectedDate }),
	});

	const handleRefetch = useCallback(() => {
		refetch();
	}, []);

	return {
		vaccinationRecords: data?.data?.vaccinationRecords,
		isPending,
		refetch: handleRefetch,
	};
}
