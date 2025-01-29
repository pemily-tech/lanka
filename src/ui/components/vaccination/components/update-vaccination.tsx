import { memo, useState } from 'react';
import DatePicker from 'react-datepicker';
import Select, { type SingleValue } from 'react-select';
import { format } from 'date-fns';

import useGetDropdownList from '../../../../api/use-get-dropdown-list/get-dropdown-list';
import useUpdateVaccinationRecord from '../../../../api/use-update-vaccination-record/update-vaccination-record';
import { customSelectBoxStyles } from '../../../../helpers/utils';
import { Button } from '../../../shared/button';
import Modal from '../../modal/modal';

interface OptionType {
	value: string;
	label: string;
}

function UpdateVaccination({
	isOpen,
	handleClose,
	refetch,
	id,
}: {
	isOpen: boolean;
	handleClose: () => void;
	refetch: () => void;
	id: string;
}) {
	const { data } = useGetDropdownList('REPEAT_AFTERS');
	const [selected, setSelected] = useState<SingleValue<OptionType>>(null);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [selectedDate, setSelectedDate] = useState<any>(null);
	const { mutateAsync: updateVaccination, isPending } =
		useUpdateVaccinationRecord({
			refetch,
		});

	const handleChange = (option: SingleValue<OptionType>) => {
		setSelected(option);
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onChange = (date: any) => {
		setSelectedDate(date);
	};

	const handleSubmit = async () => {
		const payload = {
			id,
			vaccinatedOnDate: format(selectedDate, 'yyyy-MM-dd'),
			repeatAfter: selected?.value,
		};
		const response = await updateVaccination(payload);
		if (response?.status === 'SUCCESS') {
			handleClose();
		}
	};

	return (
		<Modal isOpen={isOpen} handleClose={handleClose}>
			<div className="rounded-8 bg-white p-24">
				<div className="text-24 border-b-grey-divider border-b pb-16 font-semibold">
					Update the Vaccination
				</div>
				<div className="mt-16 grid grid-cols-2 gap-24">
					<div className="col-span-1">
						<label className="text-14 leading-24 block">
							Choose Vaccine Complete Date
						</label>
						<DatePicker
							selected={selectedDate}
							onChange={onChange}
							disabledKeyboardNavigation
						/>
					</div>
					<div className="col-span-1">
						<label className="text-14 leading-24">
							Repeat same Vaccine after
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
					<span>Update Vaccination</span>
				</Button>
			</div>
		</Modal>
	);
}

export default memo(UpdateVaccination);
