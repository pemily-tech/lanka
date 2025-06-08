'use client';

import { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Plus } from 'lucide-react';
import { useParams } from 'next/navigation';

import { DATE_FORMAT } from '../../../../../helpers/constant';
import { type IPrescription } from '../../../../../types/prescription';
import { FloatingTextArea } from '../../../../../ui/text-area';
import { useGetPrescriptionById } from '../_api/use-get-byid';
import { useMedicineStore } from '../_store/medicine-store';

import { Button } from '@/ui/button';
import { Calendar } from '@/ui/calendar';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';

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
				<DialogHeader className="mb-6">
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<FloatingTextArea
					label={label}
					id={label.toLowerCase()}
					value={value}
					onChange={(e) => onChange(e.target.value)}
				/>
				<DialogFooter className="mt-1 gap-6">
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
	const isPrescriptionSaved = !!prescription.url;

	const { setAdvice, setFollowup, follwup } = useMedicineStore();
	const [openAdvice, setOpenAdvice] = useState(false);

	const [localAdvice, setLocalAdvice] = useState('');

	useEffect(() => {
		setLocalAdvice(prescription.advice || '');
		setFollowup(
			prescription.nextVisit ? new Date(prescription.nextVisit) : null
		);
	}, [prescription]);

	return (
		<div className="flex flex-col gap-16 px-4 py-6">
			<div className="flex flex-row items-center gap-2">
				<Button
					onClick={
						isPrescriptionSaved
							? () => null
							: () => setOpenAdvice(true)
					}
					className="flex cursor-pointer flex-row items-center gap-4 px-4"
					variant="ghost"
					size="lg"
				>
					<Plus className="text-primary size-4" />
					<span className="text-primary font-medium">Advice: </span>
				</Button>
				<span>
					{isPrescriptionSaved ? prescription.advice : localAdvice}
				</span>
			</div>
			<div>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							className="flex cursor-pointer flex-row items-center gap-2 px-4"
							variant="ghost"
							size="lg"
						>
							<CalendarIcon className="text-primary size-4" />
							<span className="text-primary font-medium">
								Follow-up On:
							</span>
							<span>
								{isPrescriptionSaved
									? prescription?.nextVisit &&
										format(
											prescription?.nextVisit,
											DATE_FORMAT
										)
									: follwup && format(follwup, DATE_FORMAT)}
							</span>
						</Button>
					</PopoverTrigger>
					{!isPrescriptionSaved && (
						<PopoverContent className="w-auto p-0">
							<Calendar
								mode="single"
								selected={follwup ?? undefined}
								onSelect={(day) => setFollowup(day ?? null)}
							/>
						</PopoverContent>
					)}
				</Popover>
			</div>

			<EditableDialog
				title="Update Advice"
				label="Advice"
				value={localAdvice}
				open={openAdvice}
				onOpenChange={setOpenAdvice}
				onChange={setLocalAdvice}
				onConfirm={() => {
					setAdvice(localAdvice);
					setOpenAdvice(false);
				}}
			/>
		</div>
	);
}
