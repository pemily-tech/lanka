'use client';

import { useParams } from 'next/navigation';

import { useGetCertificateBasicDetails } from '../_api/use-get-basic-details';

import { type ICertificateTemplate } from '@/types/health-certificate';
import Spinner from '@/ui/spinner';

export default function Templates() {
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
		<div className="">
			<div className="m-6 border-b border-border">
				{templateDetails?.descriptions?.map((description) => {
					return (
						<p
							className="pb-4"
							dangerouslySetInnerHTML={{ __html: description }}
						/>
					);
				})}
			</div>
			<div className="flex justify-between items-center mx-6">
				<div className="flex-1">
					{templateDetails?.dateFields?.map((date) => {
						return <p>{date}: </p>;
					})}
				</div>
				<div className="flex-1 flex justify-end items-center">
					{templateDetails?.signatureFields?.map((signature) => {
						return <p>{signature}</p>;
					})}
				</div>
			</div>
		</div>
	);
}
