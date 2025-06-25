'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

import { useGetCertificateById } from '../_api/use-get-byid';
import { useVaccineStore } from '../_store/use-vaccine';
import { useColumns } from './vaccine-columns';

import { DataTable } from '@/ui/data-table';
import Spinner from '@/ui/spinner';

export default function Vaccines() {
	const params = useParams();
	const certificateNo = params?.id as string;
	const { data, isPending } = useGetCertificateById(certificateNo);
	const vaccinesData = data?.data?.certificate?.vaccines || [];
	const setVaccines = useVaccineStore((s) => s.setVaccines);
	const vaccines = useVaccineStore((s) => s.vaccines);

	useEffect(() => {
		setVaccines(vaccinesData);
	}, [data]);

	const columns = useColumns();

	if (isPending) {
		return <Spinner className="py-4" />;
	}

	if (vaccinesData.length <= 0) {
		return null;
	}

	return (
		<div className="m-6">
			<DataTable
				columns={columns}
				data={vaccines}
				isPending={false}
				getRowId={(row) => row._id}
				emptyMessage="Nothing found."
			/>
		</div>
	);
}
