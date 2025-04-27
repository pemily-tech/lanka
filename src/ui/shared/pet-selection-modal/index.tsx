import React from 'react';

import { Button } from '../button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../dialog';
import { Separator } from '../separator';
import { usePrescriptionStepper } from './_hooks/use-stepper';
import Doctor from './doctor';
import PetParent from './pet-parent';

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
		getErrorMessage,
		setValue,
	} = usePrescriptionStepper({
		onComplete: () => setOpen(false),
	});

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="max-w-[60%]">
				<DialogHeader>
					<DialogTitle></DialogTitle>
				</DialogHeader>
				<div className="my-12">
					<div className="flex justify-between py-12">
						<h2 className="text-lg font-medium">
							Create a New Prescription
						</h2>
						<span className="text-muted-foreground text-sm">
							Step {currentIndex + 1} of {steps.length}
						</span>
					</div>
					<StepperNavigation
						stepper={stepper}
						currentIndex={currentIndex}
					/>
					<div className="space-y-4">
						{stepper.switch({
							doctor: () => <Doctor setValue={setValue} />,
							parent: () => <PetParent />,
							pet: () => <div>Complete</div>,
						})}
						{getErrorMessage() && (
							<p className="text-sm text-red-500">
								{getErrorMessage()}
							</p>
						)}

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
								{stepper.isLast ? 'Complete' : 'Next'}
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
					<React.Fragment key={step.id}>
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
								className="flex size-32 items-center justify-center rounded-full"
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
					</React.Fragment>
				))}
			</ol>
		</nav>
	);
}
