'use client';

import { useParams } from 'next/navigation';

import { useGetCertificateBasicDetails } from '../_api/use-get-basic-details';
import Vaccines from './vaccines';

import { cn } from '@/helpers/utils';
import { type ICertificateTemplate } from '@/types/health-certificate';
import Spinner from '@/ui/spinner';

export default function Templates() {
	const params = useParams();
	const certificateNo = params?.id as string;
	const { data, isPending } = useGetCertificateBasicDetails(certificateNo);
	const templateDetails =
		data?.data?.certificateBasicDetails?.template ??
		({} as ICertificateTemplate);
	const totalDateFields = templateDetails?.dateFields?.length ?? 0;
	const totalSignatureFields = templateDetails?.signatureFields?.length ?? 0;
	if (isPending) {
		return <Spinner className="py-4" />;
	}

	return (
		<div className="">
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
			<Vaccines />
			<div className={cn('flex  gap-10 mx-6', 'flex-col')}>
				<div
					className={cn(
						totalSignatureFields >= 2
							? 'justify-between flex-1'
							: 'justify-end',
						'flex'
					)}
				>
					{templateDetails?.signatureFields?.map((signature, i) => {
						return <p key={i}>{signature}: </p>;
					})}
				</div>
				<div
					className={cn(
						totalDateFields >= 2
							? 'justify-between flex-1'
							: 'justify-start',
						'flex'
					)}
				>
					{templateDetails?.dateFields?.map((date, i) => {
						return <p key={i}>{date}: </p>;
					})}
				</div>
			</div>
		</div>
	);
}
