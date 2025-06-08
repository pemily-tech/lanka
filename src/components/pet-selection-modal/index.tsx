import React, { Fragment } from 'react';
import dynamic from 'next/dynamic';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '../../ui/dialog';
import { Separator } from '../../ui/separator';
import { usePrescriptionStepper } from './_hooks/use-stepper';

import { Button } from '@/ui/button';
import { Loader } from '@/ui/loader';

const Doctor = dynamic(() => import('./doctor'), {
	loading: () => <Loader />,
	ssr: false,
});

const ErrorMessage = dynamic(() => import('./error-message'), {
	loading: () => <Loader />,
	ssr: false,
});

const Pet = dynamic(() => import('./pet'), {
	loading: () => <Loader />,
	ssr: false,
});

const PetParent = dynamic(() => import('./pet-parent'), {
	loading: () => <Loader />,
	ssr: false,
});

export default function PetSelectModal({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (o: boolean) => void;
}) {
	const {
		stepper,
		steps,
		currentIndex,
		handleNext,
		setValue,
		selectedDoctorId,
		doctorError,
		parentError,
		petError,
		selectedParentId,
		selectedPetId,
	} = usePrescriptionStepper({
		onComplete: () => setOpen(false),
	});

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="max-w-[60%]">
				<DialogHeader>
					<DialogTitle>
						Create a New Prescription{' '}
						<span className="text-black-1/60 text-sm font-normal">
							(Step {currentIndex + 1} of {steps.length})
						</span>
					</DialogTitle>
				</DialogHeader>
				<DialogDescription />
				<div className="my-3">
					<StepperNavigation
						stepper={stepper}
						currentIndex={currentIndex}
					/>
					<div className="space-y-4 ">
						{stepper.switch({
							doctor: () => (
								<Doctor
									setValue={setValue}
									selectedDoctorId={selectedDoctorId}
								/>
							),
							parent: () => (
								<PetParent
									setValue={setValue}
									selectedParentId={selectedParentId}
								/>
							),
							pet: () => (
								<Pet
									setValue={setValue}
									selectedParentId={selectedParentId ?? ''}
									selectedPetId={selectedPetId}
								/>
							),
						})}
						<ErrorMessage
							selectedDoctorId={selectedDoctorId}
							selectedParentId={selectedParentId}
							selectedPetId={selectedPetId}
							stepperId={stepper.current.id}
							doctorError={doctorError}
							parentError={parentError}
							petError={petError}
						/>
						<div className="flex justify-end gap-16">
							<Button
								type="button"
								variant="secondary"
								onClick={stepper.prev}
								disabled={stepper.isFirst}
								className="px-32"
								size="lg"
							>
								Back
							</Button>
							<Button
								onClick={handleNext}
								className="px-32"
								size="lg"
							>
								{stepper.isLast ? 'Done' : 'Next'}
							</Button>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

function StepperNavigation({
	currentIndex,
	stepper,
}: {
	currentIndex: number;
	stepper: any;
}) {
	return (
		<nav className="group my-4">
			<ol className="flex items-center justify-between gap-2">
				{stepper.all.map((step: any, index: number, array: any[]) => (
					<Fragment key={step.id}>
						<li className="flex shrink-0 items-center gap-4">
							<Button
								type="button"
								role="tab"
								variant={
									index <= currentIndex
										? 'default'
										: 'secondary'
								}
								onClick={() => stepper.goTo(step.id)}
								className="flex size-8 items-center justify-center rounded-full"
							>
								{index + 1}
							</Button>
							<span className="text-sm font-medium">
								{step.label}
							</span>
						</li>
						{index < array.length - 1 && (
							<Separator
								className={`mx-12 flex-1 ${index < currentIndex ? 'bg-primary h-[2px]' : 'bg-muted'}`}
							/>
						)}
					</Fragment>
				))}
			</ol>
		</nav>
	);
}
