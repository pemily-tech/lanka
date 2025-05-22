/* eslint-disable max-lines-per-function */
/* eslint-disable indent */
'use client';

import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import { BellIcon, CheckIcon, Trash2Icon } from 'lucide-react';
import dynamic from 'next/dynamic';

import useSendVaccinationRemainder from '../../../../api/use-send-vaccination-remainder/send-vaccination-remainder';
import useUpdateVaccinationRecord from '../../../../api/use-update-vaccination-record/update-vaccination-record';
import Loading from '../../../../app/loading';
import { ModalTypes } from '../../../../helpers/primitives';
import { openModal } from '../../../../store/modal';
import { type IVaccinationRecord } from '../../../../types/clinic';
import { ImagePlaceholder } from '../../../shared/image';

import { Button } from '@/ui/shared/button';

const UpdateVaccination = dynamic(() => import('./update-vaccination'), {
	loading: () => <Loading />,
});

interface IRecordItem {
	record: IVaccinationRecord;
	refetch: () => void;
	activeFilter: string;
}

function Record({ record, refetch }: IRecordItem) {
	const tempVaccine = record?.vaccinationDate
		? parseISO(record?.vaccinationDate as string)
		: '';
	const vaccineDate = tempVaccine && format(tempVaccine, 'do MMM yy');
	const tempUpcoming = record?.vaccinatedOnDate
		? parseISO(record?.vaccinatedOnDate as string)
		: '';
	const upcomingDate =
		tempUpcoming !== '' && format(tempUpcoming, 'do MMM yy');
	const dispatch = useDispatch();
	const { mutate: vaccinationRemainder, isPending } =
		useSendVaccinationRemainder({
			refetch,
		});
	const { mutate: updateVaccination, isPending: updateLoading } =
		useUpdateVaccinationRecord({
			refetch,
		});
	const [open, setOpen] = useState(false);
	const notificationDisbaled =
		record?.notificationCount >= 3 ||
		isPending ||
		updateLoading ||
		typeof record?.vaccinatedOnDate === 'string';

	const handleRemainder = () => {
		const payload = {
			parentMobile:
				typeof record?.parent.mobile === 'string'
					? Number(record?.parent.mobile)
					: record?.parent.mobile,
			petName: record?.pet?.name,
			clinicName: record?.clinic?.name,
			nextVaccinationDate: record?.vaccinationDate,
			vaccineName: record?.vaccineName,
			id: record?._id,
		};
		vaccinationRemainder(payload);
	};

	const onDelete = () => {
		const payload = {
			id: record?._id,
			active: false,
		};
		updateVaccination(payload);
	};

	const handleDelete = () => {
		dispatch(
			openModal({
				isOpen: true,
				view: ModalTypes.CONFIRMATION_MODAL,
				confirmationTitle: 'Delete Vaccination Record',
				confirmationHeading: 'Are you sure you want to record?',
				onHandleConfirm: onDelete,
				center: true,
			})
		);
	};

	const handleEdit = () => {
		setOpen(true);
	};

	return (
		<div className="rounded-8 shadow-base mb-12 grid grid-cols-4 gap-24 bg-white px-16 py-12">
			<UpdateVaccination
				isOpen={open}
				handleClose={() => setOpen(false)}
				refetch={refetch}
				id={record._id}
			/>
			<div className="col-span-1 flex gap-16">
				<ImagePlaceholder
					src="/images/vaccination-record.svg"
					containerClasses="w-[85px] h-[72px]"
				/>
				<div>
					<p className="text-18 font-semibold">{record?.pet?.name}</p>
					<p className="text-14">{record?.parent?.name}</p>
				</div>
			</div>
			<div className="col-span-2 flex items-center justify-between">
				<div>
					<p className="text-14 leading-24 font-semibold">
						Vaccination: {record.vaccineName}
					</p>
					<p className="leading-32 text-14">
						Vaccinated On:{' '}
						{record?.vaccinatedOnDate
							? upcomingDate
							: '(Not Updated)'}
					</p>
					<p className="leading-24  text-14">Due On: {vaccineDate}</p>
				</div>
				{record?.vaccinatedOnDate === null ||
				!record?.vaccinatedOnDate ? (
					<Button
						onClick={handleEdit}
						className="border-primary-1 flex items-center justify-center border px-12 py-6"
					>
						<span className="text-14 text-primary-1 font-bold">
							Complete
						</span>
					</Button>
				) : (
					<div className="flex items-center gap-4">
						<CheckIcon className="w-22 h-22 text-[#4caf50]" />
						<span className="text-14 font-bold text-[#4caf50]">
							Completed
						</span>
					</div>
				)}
			</div>
			<div className="edit-calender col-span-1 flex items-center justify-end">
				<div className="flex items-end gap-6">
					<Button
						disabled={notificationDisbaled || isPending}
						onClick={handleRemainder}
						className="bg-primary rounded-10 flex h-[32px] items-center justify-center gap-6 px-12"
						loading={isPending}
					>
						<BellIcon width={16} height={16} color="#FFF" />
						<span className="text-14 font-normal text-white">
							Notify
						</span>
					</Button>
					<span className="text-12 font-medium">
						{record.notificationCount}/3 sent
					</span>
				</div>
				<Button
					onClick={handleDelete}
					className="flex size-[42px] items-center justify-center"
					variant="ghost"
					size="sm"
				>
					<Trash2Icon className=" text-red-1 !size-16" />
				</Button>
			</div>
		</div>
	);
}

export default memo(Record);
