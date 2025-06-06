'use client';

import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { Trash2Icon } from 'lucide-react';

import useUpdateMedicalRecord from '../../../../api/use-update-medical-record/update-medical-record';
import { certificateData } from '../../../../helpers/constant';
import { ModalTypes } from '../../../../helpers/primitives';
import { closeModal, openModal } from '../../../../store/modal';
import { type IMedicalRecord } from '../../../../types/clinic';
import { PdfIcon } from '../../../icons/pdf-icon';
import { Button } from '../../../shared/button';
import useDocumentDownlaod from '../hooks/use-download-document';

interface IRecordItem {
	record: IMedicalRecord;
	refetch: () => void;
	activeFilter: string;
}

function RecordItem({ record, refetch, activeFilter }: IRecordItem) {
	const dispatch = useDispatch();
	const { url } = useDocumentDownlaod({ url: record.url });
	const { mutate: updateMedicalRecord } = useUpdateMedicalRecord({
		id: record?._id,
		refetch,
		handleClose: closeModal,
	});

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

	const getCertificateLabel = (value: string) => {
		const certificate = certificateData.find(
			(cert) => cert.value === value
		);
		return certificate ? certificate.label : '';
	};

	return (
		<div className="rounded-8 shadow-base mb-12 grid grid-cols-2 gap-12 bg-white px-16 py-12">
			<div className="col-span-1 w-[500px]">
				<div className="flex gap-12 ">
					<PdfIcon width={85} height={72} />
					<div className="flex flex-col gap-6">
						<p className="text-16 font-semibold">
							{record.pet.name} (
							{getCertificateLabel(record?.type)})
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
			<div className="col-span-1 flex items-center justify-end gap-24">
				<a
					target="_blank"
					href={url as string}
					rel="noreferrer"
					onClick={handleDownload}
					className="text-14 text-primary decoration-primary-1 flex items-center justify-center font-bold underline"
				>
					View/Print
				</a>
				<Button
					onClick={handleDelete}
					className="flex size-[32px] items-center justify-center"
					variant="ghost"
				>
					<Trash2Icon className="text-red-1" />
				</Button>
			</div>
		</div>
	);
}

export default memo(RecordItem);
