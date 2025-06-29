import { useCallback, useState } from 'react';
import { format, parseISO, startOfToday } from 'date-fns';
import debounce from 'lodash.debounce';
import { useQueryStates } from 'nuqs';

import { useCreateCertificate } from '../../../../../api/mutations/use-create-certificate';
import { useGetCertificate } from '../_api/use-get-certificate';

import { DEFAULT_DATE_FORMAT } from '@/helpers/constant';
import { AppConstants, RecordTypes } from '@/helpers/primitives';
import { useUpdateUrl } from '@/hooks/use-update-url';
import { queryClient } from '@/services/providers';

export function useCertificateList() {
	const today = startOfToday();

	const [{ start, end }, setDateRange] = useQueryStates({
		start: {
			defaultValue: format(today, DEFAULT_DATE_FORMAT),
			parse: parseISO,
			serialize: (date: Date) => format(date, DEFAULT_DATE_FORMAT),
		},
		end: {
			defaultValue: format(today, DEFAULT_DATE_FORMAT),
			parse: parseISO,
			serialize: (date: Date) => format(date, DEFAULT_DATE_FORMAT),
		},
	});

	const selectedDateRange = {
		from: start ?? today,
		to: end ?? today,
	};

	const {
		limit,
		page,
		handlePagination,
		active,
		setActive,
		updateQueryParams,
	} = useUpdateUrl();

	const [open, setOpen] = useState(false);
	const [input, setInput] = useState('');
	const [searchTerm, setSearchTerm] = useState('');

	const { data, isPending } = useGetCertificate({
		count: 1,
		startDate: format(selectedDateRange.from, DEFAULT_DATE_FORMAT),
		endDate: format(selectedDateRange.to, DEFAULT_DATE_FORMAT),
		active,
		page,
		searchTerm,
		limit,
	});

	const certificateData = data?.data?.certificates ?? [];
	const totalCount = data?.data?.totalCount ?? 0;

	const { mutateAsync: createCertificate } = useCreateCertificate();

	const debouncedSearch = useCallback(
		debounce((val: string) => setSearchTerm(val), 500),
		[]
	);

	const handleChange = (val: string) => {
		setInput(val);
		debouncedSearch(val);
		if (page !== 0) {
			handlePagination(0);
		}
	};

	const invalidateQueries = () => {
		queryClient.invalidateQueries({
			queryKey: [
				'certificate/list',
				{
					count: 1,
					startDate: format(
						selectedDateRange.from,
						DEFAULT_DATE_FORMAT
					),
					endDate: format(selectedDateRange.to, DEFAULT_DATE_FORMAT),
					active,
					page,
					searchTerm,
				},
			],
		});
	};

	const onComplete = async ({
		parentId,
		petId,
	}: {
		parentId: string;
		petId: string;
	}) => {
		const payload = {
			parentId,
			patientId: petId,
			type: RecordTypes.TravelVaccinationCertificate,
		};
		const response = await createCertificate(payload);
		if (response.status === AppConstants.Success) {
			setOpen(false);
			invalidateQueries();
		}
	};

	return {
		selectedDateRange,
		setDateRange,
		updateQueryParams,
		handlePagination,
		active,
		setActive,
		input,
		handleChange,
		open,
		setOpen,
		onComplete,
		certificateData,
		totalCount,
		page,
		isPending,
		invalidateQueries,
		limit,
	};
}
