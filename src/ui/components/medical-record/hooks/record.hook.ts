import { useCallback } from 'react';

import useGetMedicalRecords from '../../../../api/use-get-medical-records/use-get-medical-records';

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
	const { data, isPending, refetch } = useGetMedicalRecords({
		type: activeFilter,
		...(petId ? { petId } : { date: selectedDate }),
	});

	const handleRefetch = useCallback(() => {
		refetch();
	}, []);

	return {
		medicalRecords: data?.data?.medicalRecords,
		isPending,
		refetch: handleRefetch,
	};
}
