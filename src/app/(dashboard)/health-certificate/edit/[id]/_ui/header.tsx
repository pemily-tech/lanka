'use client';

import { useMemo } from 'react';
import { format } from 'date-fns';
import { useParams } from 'next/navigation';

import { useGetCertificateById } from '../_api/use-get-byid';

import { DATE_FORMAT } from '@/helpers/constant';
import { type ICertificate } from '@/types/health-certificate';

export default function Header() {
	const params = useParams();
	const certificateNo = params?.id as string;
	const { data: certificateData } = useGetCertificateById(certificateNo);
	const certificate = useMemo(() => {
		return certificateData?.data?.certificate ?? ({} as ICertificate);
	}, [certificateData]);

	return (
		<div className="mb-4 flex items-center justify-between">
			<div className="flex items-center gap-1">
				<span className="text-black/60">Certificate No: </span>
				<span className="text-lg font-medium">{certificateNo}</span>
			</div>
			<div className="flex items-center gap-1">
				<span className="text-black/60">Date: </span>
				{certificate?.certificateDate && (
					<span className="text-lg font-medium">
						{format(certificate?.certificateDate, DATE_FORMAT)}
					</span>
				)}
			</div>
		</div>
	);
}
