/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useState } from 'react';
import DatePicker from 'react-datepicker';
import Select, { type SingleValue } from 'react-select';
import { format } from 'date-fns';

import useGetDropdownList from '../../../../api/use-get-dropdown-list/get-dropdown-list';
import useUpdateFollowUpRecord from '../../../../api/use-update-follow-up-record/update-follow-up-record';
import { customSelectBoxStyles } from '../../../../helpers/utils';
import Modal from '../../modal/modal';

import { Button } from '@/ui/shared/button';

interface OptionType {
	value: string;
	label: string;
}

function UpdateFollowup({
	isOpen,
	handleClose,
	refetch,
	id,
	active,
}: {
	isOpen: boolean;
	handleClose: () => void;
	refetch: () => void;
	id: string;
	active: boolean;
}) {
	const { data } = useGetDropdownList('REPEAT_AFTERS');
	const [selected, setSelected] = useState<SingleValue<OptionType>>(null);
	const [selectedDate, setSelectedDate] = useState<any>(null);
	const { mutateAsync: updateFollowup, isPending } = useUpdateFollowUpRecord({
		refetch,
	});

	const handleChange = (option: SingleValue<OptionType>) => {
		setSelected(option);
	};

	const onChange = (date: any) => {
		setSelectedDate(date);
	};

	const handleSubmit = async () => {
		const payload = {
			id,
			followUpCompleteDate: format(selectedDate, 'yyyy-MM-dd'),
			repeatAfter: selected?.value,
			active,
		};
		const response = await updateFollowup(payload);
		if (response?.status === 'SUCCESS') {
			handleClose();
		}
	};

	return (
		<Modal isOpen={isOpen} handleClose={handleClose}>
			<div className="rounded-8 bg-white p-24">
				<div className="text-24 border-b-grey-divider border-b pb-16 font-semibold">
					Update the Followup
				</div>
				<div className="mt-16 grid grid-cols-2 gap-24">
					<div className="col-span-1">
						<label className="text-14 leading-24 block">
							Choose Followup Complete Date
						</label>
						<DatePicker
							selected={selectedDate}
							onChange={onChange}
							disabledKeyboardNavigation
						/>
					</div>
					<div className="col-span-1">
						<label className="text-14 leading-24">
							Repeat same Followup after
						</label>
						<Select
							options={data?.data?.dropdown}
							className="react-select-container h-[52px]"
							classNamePrefix="react-select"
							styles={customSelectBoxStyles}
							onChange={handleChange}
							value={selected}
						/>
					</div>
				</div>
				<Button
					onClick={handleSubmit}
					disabled={!selected || !selectedDate || isPending}
					loading={isPending}
					className="mt-24"
				>
					<span>Update Followup</span>
				</Button>
			</div>
		</Modal>
	);
}

export default memo(UpdateFollowup);
