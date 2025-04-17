import { memo } from 'react';

import { type IVaccinationRecord } from '../../../../types/clinic';
import { ImagePlaceholder } from '../../../shared/image';
import Spinner from '../../../shared/spinner';
import useRecord from '../hooks/use-record.hook';
import RecordItem from './record-item';

interface IRecord {
	activeFilter: string;
	petId: string;
	selectedDate: string;
}

function VaccinationRecords({ activeFilter, petId, selectedDate }: IRecord) {
	const { isPending, vaccinationRecords, refetch } = useRecord({
		activeFilter,
		petId,
		selectedDate,
	});

	if (isPending) {
		return <Spinner />;
	}

	if (vaccinationRecords && vaccinationRecords?.length <= 0) {
		return (
			<div className="flex flex-col items-center justify-center gap-24 py-[82px]">
				<ImagePlaceholder
					containerClasses="w-[120px] h-[180px]"
					src="/images/no-records.svg"
				/>
				<p className="text-16 font-medium">No Records found.</p>
			</div>
		);
	}

	return (
		<div className="mt-12 min-h-[395px]">
			{vaccinationRecords?.map((record: IVaccinationRecord) => {
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

export default memo(VaccinationRecords);
