import { useState } from 'react';
import { format } from 'date-fns';

import useGetFollowRecords from '../../../../api/use-get-follow-records/get-follow-records';
import useRouterQuery from '../../../../hooks/use-router-query';

export default function useFollowup() {
	const [activeFilter, setActiveFilter] = useState('PENDING');
	const { query, params } = useRouterQuery();
	const petId = query?.id as string;
	const parentId = params.get('parentId');
	const [showSidebar, setShowSidebar] = useState(false);
	const [selectedDate, setSelectedDate] = useState(
		format(new Date(), 'yyyy-MM-dd')
	);
	const { refetch } = useGetFollowRecords({
		type: activeFilter,
		...(petId ? { petId } : { date: selectedDate }),
	});

	const handleDate = (date: string) => {
		setSelectedDate(date);
	};

	return {
		activeFilter,
		setActiveFilter,
		petId,
		parentId,
		setShowSidebar,
		showSidebar,
		refetch,
		handleDate,
		selectedDate,
	};
}
