'use client';

import dynamic from 'next/dynamic';

import Loading from '../../../app/loading';
import DaysItem from '../days/days';
import Sidebar from '../sidebar';
import Filters from './components/filters';
import Records from './components/records';
import useFollowup from './hooks/use-follwup';

const FollowupForm = dynamic(() => import('../followup-form/followup-form'), {
	loading: () => <Loading />,
});

interface IFollowup {
	showDays?: boolean;
	showFilters?: boolean;
}

export function Followup({ showDays = false }: IFollowup) {
	const {
		activeFilter,
		setActiveFilter,
		petId,
		setShowSidebar,
		showSidebar,
		parentId,
		refetch,
		selectedDate,
		handleDate,
	} = useFollowup();

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
			<Records
				activeFilter={activeFilter}
				petId={petId as string}
				selectedDate={selectedDate}
			/>
			<Sidebar
				isOpen={showSidebar}
				handleClose={() => setShowSidebar(false)}
			>
				<FollowupForm
					refetch={refetch}
					petId={petId as string}
					parentId={parentId as string}
					handleClose={() => setShowSidebar(false)}
				/>
			</Sidebar>
		</div>
	);
}

export default Followup;
