'use client';

import { firstCharCapital } from '../../../helpers/utils';
import DaysItem from '../days/days';
import Sidebar from '../sidebar';
import Filters from './components/filters';
import Records from './components/records';
import Upload from './components/upload';
import useMedicalRecord from './hooks/medical-record.hook';

interface IMedicalRecords {
	showDays?: boolean;
}

export function MedicalRecord({ showDays = false }: IMedicalRecords) {
	const {
		activeFilter,
		setActiveFilter,
		petId,
		showSidebar,
		setShowSidebar,
		handleUploadClick,
		uploadMedicalRecordPending,
		handleDate,
		selectedDate,
		refetchRecords,
	} = useMedicalRecord();

	return (
		<>
			{showDays && (
				<DaysItem selectedDate={selectedDate} handleDate={handleDate} />
			)}
			<Filters
				activeFilter={activeFilter}
				setActiveFilter={setActiveFilter}
				petId={petId as string | undefined}
				setShowSidebar={setShowSidebar}
				refetchRecords={refetchRecords}
			/>
			<Records
				activeFilter={activeFilter}
				petId={petId as string}
				selectedDate={selectedDate}
			/>
			<Sidebar
				isOpen={showSidebar}
				handleClose={() => setShowSidebar(false)}
			>
				<Upload
					isLoading={uploadMedicalRecordPending}
					handleClick={handleUploadClick}
					btnTxt={`Upload ${firstCharCapital(activeFilter as string)}`}
					headingTxt={`Upload a photo of your ${firstCharCapital(
						activeFilter as string
					)}`}
				/>
			</Sidebar>
		</>
	);
}

export default MedicalRecord;
