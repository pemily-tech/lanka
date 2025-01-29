/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import Select, { type SingleValue } from 'react-select';
import { format } from 'date-fns';
import { Trash2Icon } from 'lucide-react';

import useCreateVaccinationRecords from '../../../api/use-create-vaccination-records/create-vaccination-records';
import useGetVaccinationList from '../../../api/use-get-vaccination-list/get-vaccination-list';
import { convertDates, customSelectBoxStyles } from '../../../helpers/utils';
import { Button } from '../../shared/button';

interface OptionType {
	value: string;
	label: string;
}

const VaccinationForm = ({
	refetch,
	petId,
	parentId,
	handleClose,
	type = 'sidebar',
}: {
	refetch: () => void;
	petId: string;
	parentId: string;
	handleClose: () => void;
	type?: string;
}) => {
	const [selectedVaccine, setVaccine] =
		useState<SingleValue<OptionType>>(null);
	const [selectedDates, setSelectedDates] = useState<any[]>([]);
	const { mutateAsync: createVaccination, isPending } =
		useCreateVaccinationRecords();
	const { data } = useGetVaccinationList();

	const onChange = (dates: any) => {
		setSelectedDates(dates);
	};

	const deleteDate = (date: Date) => {
		const newDates = [...selectedDates];
		const filteredDates = newDates.filter((d) => {
			return d.getTime() !== date.getTime();
		});
		setSelectedDates(filteredDates);
	};

	const handleSubmit = async () => {
		const dates = convertDates(selectedDates);
		const data = {
			petId,
			parentId,
			vaccineName: selectedVaccine?.value as string,
			vaccinationDates: dates as string[],
		};
		const response = (await createVaccination(
			data
		)) as ICommonTypes.IApiResponse<IClinicTypes.IVaccinationRecord>;
		if (response.status === 'SUCCESS') {
			refetch();
			handleClose();
		}
	};

	const handleChange = (option: SingleValue<OptionType>) => {
		setVaccine(option);
	};

	return (
		<section className="rounded-8 mt-16 flex h-full flex-col bg-white px-16">
			<h2 className="text-24 pt-16 font-semibold">
				Add Vaccination Details
			</h2>
			<h6 className="text-14 mb-24 mt-8">
				We will remind you when vaccination is due
			</h6>
			<div
				className={`flex-1 ${type === 'modal' ? 'grid grid-cols-2 gap-24' : ''}`}
			>
				<div className="col-span-1">
					<label className="text-14 leading-24">
						Choose a vaccine
					</label>
					<Select
						options={data?.data?.vaccination}
						className="react-select-container h-[52px]"
						classNamePrefix="react-select"
						styles={customSelectBoxStyles}
						onChange={handleChange}
						value={selectedVaccine}
					/>
				</div>
				<div
					className={` col-span-1 ${type === 'modal' ? '' : 'mt-24'}`}
				>
					<label className="text-14 leading-24 block">
						Choose Date
					</label>
					<DatePicker
						selectedDates={selectedDates}
						selectsMultiple
						onChange={onChange}
						shouldCloseOnSelect={false}
						disabledKeyboardNavigation
					/>
					{type === 'sidebar' && selectedDates.length > 1 && (
						<div className="mt-12 flex flex-wrap gap-8">
							{selectedDates.map((date) => {
								const formattedDate = format(
									date,
									'yyyy-MM-dd'
								);
								return (
									<div
										className="border-grey-3 rounded-10 flex gap-8 border px-8 py-6"
										key={formattedDate}
									>
										<span className="text-12">
											{formattedDate}
										</span>
										<Button
											onClick={() => deleteDate(date)}
										>
											<Trash2Icon />
										</Button>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
			<Button
				className="my-16"
				onClick={handleSubmit}
				disabled={
					!selectedVaccine || selectedDates.length <= 0 || isPending
				}
				loading={isPending}
			>
				<span className="font-black tracking-[-0.41px]">
					Add Vaccination
				</span>
			</Button>
		</section>
	);
};

export default VaccinationForm;
