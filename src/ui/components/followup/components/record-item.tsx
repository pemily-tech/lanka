/* eslint-disable max-lines-per-function */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
'use client';

import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import { BellIcon, CheckIcon, Trash2 } from 'lucide-react';
import dynamic from 'next/dynamic';

import useSendFollowUpRecord from '../../../../api/use-send-follow-up-record/send-follow-up-record';
import useUpdateFollowUpRecord from '../../../../api/use-update-follow-up-record/update-follow-up-record';
import Loading from '../../../../app/loading';
import { ModalTypes } from '../../../../helpers/primitives';
import { openModal } from '../../../../store/modal';
import { type IFollowUpRecord } from '../../../../types/clinic';
import { Button } from '../../../shared/button';
import { ImagePlaceholder } from '../../../shared/image';

const UpdateFollowup = dynamic(() => import('./update-folllowup'), {
	loading: () => <Loading />,
});

interface IRecordItem {
	record: IFollowUpRecord;
	refetch: () => void;
	activeFilter: string;
}

function Record({ record, refetch }: IRecordItem) {
	const tempFollowup = record?.followUpDate
		? parseISO(record?.followUpDate as string)
		: '';
	const followupDate = tempFollowup && format(tempFollowup, 'do MMM yyyy');
	const tempUpcoming = record?.followUpCompleteDate
		? parseISO(record?.followUpCompleteDate as string)
		: '';
	const upcomingDate =
		tempUpcoming !== '' && format(tempUpcoming, 'do MMMM yyyy');
	const { mutate: followupRemainder, isPending } = useSendFollowUpRecord({
		refetch,
	});
	const { mutate: updateFollowup, isPending: updateLoading } =
		useUpdateFollowUpRecord({
			refetch,
		});
	const dispatch = useDispatch();
	const notificationDisbaled =
		record?.notificationCount >= 3 ||
		isPending ||
		updateLoading ||
		typeof record?.followUpCompleteDate === 'string';
	const [open, setOpen] = useState(false);

	const handleRemainder = () => {
		const payload = {
			parentMobile:
				typeof record?.parent.mobile === 'string'
					? Number(record?.parent.mobile)
					: record?.parent.mobile,
			petName: record?.pet?.name,
			clinicName: record?.clinic?.name,
			followUpDate: record?.followUpDate,
			followUpType: record?.followUpType,
			id: record?._id,
		};
		followupRemainder(payload);
	};

	const onDelete = () => {
		const payload = {
			id: record?._id,
			active: false,
		};
		updateFollowup(payload);
	};

	const handleDelete = () => {
		dispatch(
			openModal({
				isOpen: true,
				view: ModalTypes.CONFIRMATION_MODAL,
				confirmationTitle: 'Delete Followup Record',
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
			<UpdateFollowup
				isOpen={open}
				handleClose={() => setOpen(false)}
				refetch={refetch}
				id={record._id}
				active={record.active}
			/>
			<div className="col-span-1 flex gap-16">
				<ImagePlaceholder
					src="/images/follow-up-records.svg"
					containerClasses="w-[85px] h-[72px]"
				/>
				<div>
					<p className="text-18 font-medium">{record?.pet?.name}</p>
					<p className="text-14">{record?.parent?.name}</p>
				</div>
			</div>
			<div className="col-span-2 flex items-center justify-between">
				<div>
					<p className="text-14 leading-24 font-medium">
						Followup: {record.followUpType}
					</p>
					<p className="leading-32 text-14">
						Follow-up On: {followupDate}
					</p>
					<p className="leading-32 text-14">
						Completed On:{' '}
						{record?.followUpCompleteDate
							? upcomingDate
							: '(Pending)'}
					</p>
				</div>
				{record?.followUpCompleteDate === null ||
				!record?.followUpCompleteDate ? (
					<Button
						onClick={handleEdit}
						className="border-primary-1 flex items-center justify-center border px-12 py-6"
						variant="outline"
					>
						<span className="text-primary-1 font-normal">
							Complete
						</span>
					</Button>
				) : (
					<div className="flex items-center gap-4">
						<CheckIcon className="w-22 h-22 text-[#4caf50]" />
						<span className="text-[#4caf50]">Completed</span>
					</div>
				)}
			</div>
			<div className="edit-calender col-span-1 flex items-center justify-end">
				<div className="flex items-end gap-6">
					<Button
						disabled={notificationDisbaled}
						onClick={handleRemainder}
						className="bg-primary rounded-10 flex h-[32px] items-center justify-center gap-6 px-12"
					>
						<BellIcon width={16} height={16} color="#FFF" />
						<span className="font-normal text-white">Notify</span>
					</Button>
					<span className="text-12 font-medium">
						{record.notificationCount}/3 sent
					</span>
				</div>
				<Button
					onClick={handleDelete}
					className="flex items-center justify-center"
					variant="ghost"
					size="sm"
				>
					<Trash2 className=" text-red-1 !size-16" />
				</Button>
			</div>
		</div>
	);
}

export default memo(Record);
