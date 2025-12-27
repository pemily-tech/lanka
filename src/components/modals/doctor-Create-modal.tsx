/* eslint-disable unicorn/filename-case */
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Doctor from '@/components/selectors/doctor';
import Pet from '@/components/selectors/pet';
import PetParent from '@/components/selectors/pet-parent';
import SlotSelector from '@/components/selectors/slot'; // Slot component
import { Button } from '@/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/ui/dialog';

// Step Indicator Component
function StepIndicator({ step }: { step: number }) {
	const steps = [
		{ label: 'Choose Doctor' },
		{ label: 'Choose Slot' },
		{ label: 'Choose Pet Parent' },
		{ label: 'Choose Pet' },
	];

	return (
		<div className="flex flex-col gap-2 mb-4 px-6">
			{/* Step X of 4 */}
			<div className="text-sm text-gray-500 font-medium">
				Step {step} of {steps.length}
			</div>

			{/* Circles + Labels */}
			<div className="flex items-center gap-4">
				{steps.map((s, index) => {
					const stepNumber = index + 1;
					const isActive = step === stepNumber;
					const isCompleted = step > stepNumber;

					return (
						<div
							key={s.label}
							className="flex items-center gap-2 flex-1"
						>
							{/* Circle */}
							<div
								className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
									isActive
										? 'bg-primary text-white'
										: isCompleted
											? 'bg-primary/50 text-white'
											: 'border border-border text-gray-500'
								}`}
							>
								{stepNumber}
							</div>

							{/* Label */}
							<span
								className={`text-sm font-medium ${
									isActive
										? 'text-primary'
										: isCompleted
											? 'text-gray-700'
											: 'text-gray-400'
								}`}
							>
								{s.label}
							</span>

							{/* Line */}
							{index < steps.length - 1 && (
								<div className="flex-1 flex items-center">
									<div className="w-full h-px bg-gray-300" />
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

type Props = {
	open: boolean;
	setOpen: (open: boolean) => void;
};

export default function DoctorCreateModal({ open, setOpen }: Props) {
	const [step, setStep] = useState(1);

	// Form to track selections
	const form = useForm({
		defaultValues: {
			doctorId: undefined,
			slot: undefined,
			parentId: undefined,
			petId: undefined,
		},
	});

	const { setValue, watch } = form;

	const selectedDoctorId = watch('doctorId');
	const selectedSlot = watch('slot');
	const selectedParentId = watch('parentId');
	const selectedPetId = watch('petId');

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="max-w-[60%] gap-0">
				{/* HEADER */}
				<DialogHeader className="border-b px-6 py-4">
					<DialogTitle>
						{step === 1 && 'Select Doctor'}
						{step === 2 && 'Select Slot'}
						{step === 3 && 'Select Pet Parent'}
						{step === 4 && 'Select Pet'}
					</DialogTitle>
				</DialogHeader>

				{/* BODY */}
				<div className="px-6 py-4">
					{/* Step Indicator */}
					<StepIndicator step={step} />

					{/* Selector Components */}
					{step === 1 && (
						<Doctor
							setValue={setValue}
							selectedDoctorId={selectedDoctorId}
						/>
					)}
					{step === 2 && selectedDoctorId && (
						<SlotSelector
							setValue={setValue}
							selectedSlot={selectedSlot}
							doctorId={selectedDoctorId}
						/>
					)}

					{step === 3 && selectedSlot && (
						<PetParent
							setValue={setValue}
							selectedParentId={selectedParentId}
						/>
					)}
					{step === 4 && selectedParentId && (
						<Pet
							setValue={setValue}
							selectedPetId={selectedPetId}
							selectedParentId={selectedParentId}
						/>
					)}
				</div>

				{/* FOOTER */}
				<div className="flex justify-between border-t px-6 py-4">
					{step > 1 && (
						<Button
							variant="outline"
							onClick={() => setStep(step - 1)}
						>
							Back
						</Button>
					)}

					<div className="ml-auto flex gap-3">
						<Button
							variant="outline"
							onClick={() => setOpen(false)}
						>
							Cancel
						</Button>

						{step === 1 && (
							<Button
								disabled={!selectedDoctorId}
								onClick={() => setStep(2)}
							>
								Next
							</Button>
						)}

						{step === 2 && (
							<Button
								disabled={!selectedSlot}
								onClick={() => setStep(3)}
							>
								Next
							</Button>
						)}

						{step === 3 && (
							<Button
								disabled={!selectedParentId}
								onClick={() => setStep(4)}
							>
								Next
							</Button>
						)}

						{step === 4 && (
							<Button
								disabled={!selectedPetId}
								onClick={() => {
									console.log({
										doctorId: selectedDoctorId,
										slot: selectedSlot,
										parentId: selectedParentId,
										petId: selectedPetId,
									});
									// Next step: Confirm / Save
								}}
							>
								Continue
							</Button>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
