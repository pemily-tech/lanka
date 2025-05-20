/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import Select, { type SingleValue } from 'react-select';
import { format } from 'date-fns';
import { X } from 'lucide-react';

import useCreateFollowUpRecords from '../../../api/use-create-follow-records/create-follow-records';
import useGetFollowupList from '../../../api/use-get-followup-list/get-followup-list';
import { convertDates, customSelectBoxStyles } from '../../../helpers/utils';
import { type IFollowUpRecord } from '../../../types/clinic';
import { type IApiResponse } from '../../../types/common';
import { Button } from '../../shared/button';

interface OptionType {
	value: string;
	label: string;
}

const FollowupForm = ({
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
	const [selectedFollowup, setFollowup] =
		useState<SingleValue<OptionType>>(null);
	const [selectedDates, setSelectedDates] = useState<any[]>([]);
	const { mutateAsync: createFollowup, isPending } =
		useCreateFollowUpRecords();
	const { data } = useGetFollowupList();

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
			followUpType: selectedFollowup?.value as string,
			followUpDates: dates as string[],
		};
		const response = (await createFollowup(
			data
		)) as IApiResponse<IFollowUpRecord>;
		if (response.status === 'SUCCESS') {
			refetch();
			handleClose();
		}
	};

	const handleChange = (option: SingleValue<OptionType>) => {
		setFollowup(option);
	};

	return (
		<section className="rounded-8 mt-16 flex h-full flex-col bg-white px-16">
			<h2 className="text-24 pt-16 font-semibold">
				Add Follow-up Details
			</h2>
			<h6 className="text-14 mb-24 mt-8">
				We will remind you when follow-up is due
			</h6>
			<div
				className={`flex-1 ${type === 'modal' ? 'grid grid-cols-2 gap-24' : ''}`}
			>
				<div className="col-span-1">
					<label className="text-14 leading-24">
						Choose a follow-up
					</label>
					<Select
						options={data?.data?.followup}
						className="react-select-container h-[52px]"
						classNamePrefix="react-select"
						styles={customSelectBoxStyles}
						onChange={handleChange}
						value={selectedFollowup}
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
											variant="ghost"
											size="icon"
										>
											<X />
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
					!selectedFollowup || selectedDates.length <= 0 || isPending
				}
				loading={isPending}
			>
				<span className="font-black tracking-[-0.41px]">
					Add Follow-up
				</span>
			</Button>
		</section>
	);
};

export default FollowupForm;
