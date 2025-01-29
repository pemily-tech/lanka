'use client';

import DaysItem from '../days/days';
import Sidebar from '../sidebar';
import VaccinationForm from '../vaccination-form/vaccination-form';
import Filters from './components/filters';
import VaccinationRecords from './components/records';
import useVaccination from './hooks/use-vaccination.hook';

interface IVaccination {
	showDays?: boolean;
}

export function Vaccination({ showDays = false }: IVaccination) {
	const {
		activeFilter,
		setActiveFilter,
		petId,
		setShowSidebar,
		showSidebar,
		refetch,
		parentId,
		selectedDate,
		handleDate,
	} = useVaccination();

	return (
		<div>
			{showDays && (
				<DaysItem selectedDate={selectedDate} handleDate={handleDate} />
			)}
			<Filters
				activeFilter={activeFilter}
				setActiveFilter={setActiveFilter}
				petId={petId as string | undefined}
				setShowSidebar={setShowSidebar}
				refetch={refetch}
			/>
			<VaccinationRecords
				activeFilter={activeFilter}
				petId={petId as string}
				selectedDate={selectedDate}
			/>
			<Sidebar
				isOpen={showSidebar}
				handleClose={() => setShowSidebar(false)}
			>
				<VaccinationForm
					refetch={refetch}
					petId={petId}
					parentId={parentId as string}
					handleClose={() => setShowSidebar(false)}
				/>
			</Sidebar>
		</div>
	);
}

export default Vaccination;
