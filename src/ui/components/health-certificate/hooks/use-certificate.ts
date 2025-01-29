import { useCallback } from 'react';

import useGetMedicalRecords from '../../../../api/use-get-medical-records/use-get-medical-records';

export default function useCertificate({
	activeFilter,
	petId,
}: {
	activeFilter: string;
	petId: string;
}) {
	const { data, isPending, refetch } = useGetMedicalRecords({
		type: activeFilter,
		petId,
	});

	const handleRefetch = useCallback(() => {
		refetch();
	}, []);

	return {
		records: data?.data?.medicalRecords,
		isPending,
		refetch: handleRefetch,
	};
}
