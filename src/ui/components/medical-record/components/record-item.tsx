'use client';

import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { DownloadIcon, NotebookPen, PencilIcon, Trash2 } from 'lucide-react';
import dynamic from 'next/dynamic';

import useUpdateMedicalRecord from '../../../../api/use-update-medical-record/update-medical-record';
import Loading from '../../../../app/loading';
import { ModalTypes } from '../../../../helpers/primitives';
import { closeModal, openModal } from '../../../../store/modal';
import { type IMedicalRecord } from '../../../../types/clinic';
import useDocumentDownlaod from '../hooks/use-download-document.hook';
import PreviewImage from './preview-image';

import { Button } from '@/ui/shared/button';

const CommentModal = dynamic(() => import('./comment-modal'), {
	loading: () => <Loading />,
});

interface IRecordItem {
	record: IMedicalRecord;
	refetch: () => void;
	activeFilter: string;
}

function Record({ record, refetch, activeFilter }: IRecordItem) {
	const { imgType, url } = useDocumentDownlaod({ url: record.url });
	const dispatch = useDispatch();
	const { mutate: updateMedicalRecord } = useUpdateMedicalRecord({
		id: record?._id,
		refetch,
		handleClose: closeModal,
	});
	const [showModal, setShowModal] = useState(false);

	const onDelete = () => {
		const commentData = {
			type: activeFilter,
			active: false,
		};
		updateMedicalRecord(commentData);
	};

	const handleDelete = () => {
		dispatch(
			openModal({
				isOpen: true,
				view: ModalTypes.CONFIRMATION_MODAL,
				confirmationTitle: 'Delete Record',
				confirmationHeading:
					'Are you sure you want to delete the record?',
				onHandleConfirm: onDelete,
				center: true,
			})
		);
	};

	const handleDownload = () => {};

	const handleModalClose = () => {
		setShowModal(false);
	};

	const handleModalOpen = () => {
		setShowModal(true);
	};

	return (
		<div className="rounded-8 shadow-base mb-12 grid grid-cols-3 gap-12 bg-white px-16 py-12">
			<CommentModal
				isOpen={showModal}
				id={record?._id}
				comment={record.comment as string}
				handleClose={handleModalClose}
				refetch={refetch}
				activeFilter={activeFilter}
			/>
			<div className="col-span-1">
				<div className="flex gap-12 ">
					<PreviewImage imgType={imgType} url={url as string} />
					<div className="flex flex-col gap-6">
						<p className="text-18 font-semibold">
							{record.pet.name}
						</p>
						<p className="text-14">{record?.parent?.name}</p>
					</div>
				</div>
				<p className="text-12 mt-8">
					Uploaded on:{' '}
					{format(
						toZonedTime(record?.createdAtUTC, 'Asia/Kolkata'),
						'do MMMM yyyy'
					)}
				</p>
			</div>
			<div className="col-span-1">
				<div className="flex justify-between">
					<div className="flex items-center gap-6">
						<NotebookPen className="!size-18" />
						<span className="text-14">Notes</span>
					</div>
					<Button
						onClick={handleModalOpen}
						className="flex size-32 items-center justify-center"
						variant="ghost"
						size="sm"
					>
						<PencilIcon className="!size-18" />
					</Button>
				</div>
				<span className="text-14">{record?.comment}</span>
			</div>
			<div className="col-span-1 flex items-center justify-end gap-12">
				<a
					target="_blank"
					href={url as string}
					rel="noreferrer"
					onClick={handleDownload}
					className="flex size-[32px] items-center justify-center"
				>
					<DownloadIcon className="!size-18" />
				</a>
				<Button
					onClick={handleDelete}
					className="flex size-[32px] items-center justify-center"
					variant="ghost"
					size="sm"
				>
					<Trash2 className="text-red-1 !size-18" />
				</Button>
			</div>
		</div>
	);
}

export default memo(Record);
