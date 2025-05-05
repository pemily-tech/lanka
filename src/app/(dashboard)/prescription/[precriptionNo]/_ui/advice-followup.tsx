'use client';

import { useEffect, useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { useParams } from 'next/navigation';

import { type IPrescription } from '../../../../../types/prescription';
import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	FloatingTextArea,
} from '../../../../../ui/shared';
import { useGetPrescriptionById } from '../_api/use-get-byid';
import { useMedicineStore } from '../_store/medicine-store';

type EditableDialogProps = {
	title: string;
	label: string;
	value: string;
	open: boolean;
	onOpenChange: (v: boolean) => void;
	onChange: (value: string) => void;
	onConfirm: () => void;
};

function EditableDialog({
	title,
	label,
	value,
	open,
	onOpenChange,
	onChange,
	onConfirm,
}: EditableDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader className="mb-24">
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<FloatingTextArea
					label={label}
					id={label.toLowerCase()}
					value={value}
					onChange={(e) => onChange(e.target.value)}
				/>
				<DialogFooter className="mt-24 gap-24">
					<DialogClose>Close</DialogClose>
					<Button size="lg" onClick={onConfirm}>
						Confirm
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default function AdviceFollowup() {
	const params = useParams();
	const { data } = useGetPrescriptionById(params?.precriptionNo as string);
	const prescription = useMemo(() => {
		return data?.data?.prescription || ({} as IPrescription);
	}, [data?.data?.prescription]);

	const { setAdvice, setFollowup } = useMedicineStore();
	const [openAdvice, setOpenAdvice] = useState(false);
	const [openFollowup, setOpenFollowup] = useState(false);

	const [localAdvice, setLocalAdvice] = useState('');
	const [localFollowup, setLocalFollowup] = useState('');

	useEffect(() => {
		setLocalAdvice(prescription.advice || '');
		setLocalFollowup(prescription.nextVisit || '');
	}, [prescription]);

	return (
		<div className="flex flex-col gap-[24px] px-16 py-24">
			<div
				onClick={() => setOpenAdvice(true)}
				className="flex cursor-pointer flex-row items-center gap-4"
			>
				<Plus className="text-primary size-16" />
				<span className="text-primary font-medium">Advice:</span>
				<span>{prescription.advice}</span>
			</div>
			<div
				onClick={() => setOpenFollowup(true)}
				className="flex cursor-pointer flex-row items-center gap-4"
			>
				<Plus className="text-primary size-16" />
				<span className="text-primary font-medium">Followup:</span>
				<span>{prescription.nextVisit}</span>
			</div>

			<EditableDialog
				title="Update Advice"
				label="Advice"
				value={localAdvice}
				open={openAdvice}
				onOpenChange={setOpenAdvice}
				onChange={setLocalAdvice}
				onConfirm={() => setAdvice(localAdvice)}
			/>

			<EditableDialog
				title="Update Followup"
				label="Followup"
				value={localFollowup}
				open={openFollowup}
				onOpenChange={setOpenFollowup}
				onChange={setLocalFollowup}
				onConfirm={() => setFollowup(localFollowup)}
			/>
		</div>
	);
}
