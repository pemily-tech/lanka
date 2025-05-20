import { type IMedicalRecord } from '../../../../types/clinic';
import { ImagePlaceholder } from '../../../shared/image';
import Spinner from '../../../shared/spinner';
import useCertificate from '../hooks/use-certificate';
import RecordItem from './item';

export default function Certificate({
	activeFilter,
	petId,
}: {
	activeFilter: string;
	petId: string;
}) {
	const { records, refetch, isPending } = useCertificate({
		activeFilter,
		petId,
	});

	if (isPending) {
		return <Spinner />;
	}

	if (records && records?.length <= 0) {
		return (
			<div className="flex flex-col items-center justify-center gap-24 py-[82px]">
				<ImagePlaceholder
					containerClasses="w-[120px] h-[150px]"
					src="/images/no-records.svg"
				/>
				<p className="text-16 font-medium">No Records found.</p>
			</div>
		);
	}

	return (
		<div className="mt-12 min-h-[360px]">
			{records?.map((record: IMedicalRecord) => {
				return (
					<RecordItem
						key={record._id}
						record={record}
						refetch={refetch}
						activeFilter={activeFilter}
					/>
				);
			})}
		</div>
	);
}
