'use client';

import { useParams } from 'next/navigation';

import { useGetCertificateBasicDetails } from '../_api/use-get-basic-details';

import { type ICertificateTemplate } from '@/types/health-certificate';
import Spinner from '@/ui/spinner';

export default function TemplateDetails() {
	const params = useParams();
	const certificateNo = params?.id as string;
	const { data, isPending } = useGetCertificateBasicDetails(certificateNo);
	const templateDetails =
		data?.data?.certificateBasicDetails?.template ??
		({} as ICertificateTemplate);

	if (isPending) {
		return <Spinner className="py-4" />;
	}

	return (
		<div className="m-6">
			{templateDetails?.descriptions?.map((description, i) => {
				return (
					<p
						className="pb-4"
						key={i}
						dangerouslySetInnerHTML={{ __html: description }}
					/>
				);
			})}
		</div>
	);
}
