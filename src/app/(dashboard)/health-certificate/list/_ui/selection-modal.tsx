import React, { Fragment } from 'react';
import dynamic from 'next/dynamic';

import { useSelectionStepper } from '../_hooks/use-stepper';

import { Button } from '@/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/ui/dialog';
import { Loader } from '@/ui/loader';
import { Separator } from '@/ui/separator';

const Pet = dynamic(() => import('@/components/selectors/pet'), {
	loading: () => (
		<div className="h-[380px] flex-center">
			<Loader />
		</div>
	),
	ssr: false,
});

const PetParent = dynamic(() => import('@/components/selectors/pet-parent'), {
	loading: () => (
		<div className="h-[380px] flex-center">
			<Loader />
		</div>
	),
	ssr: false,
});

export default function PetSelectModal({
	open,
	setOpen,
	heading,
	onComplete,
}: {
	open: boolean;
	setOpen: (o: boolean) => void;
	heading: string;
	onComplete: ({
		parentId,
		petId,
	}: {
		parentId: string;
		petId: string;
	}) => void;
}) {
	const {
		stepper,
		steps,
		currentIndex,
		handleNext,
		setValue,
		selectedParentId,
		selectedPetId,
	} = useSelectionStepper({
		onComplete,
	});

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="max-w-[60%] gap-0 px-0 pt-6 pb-0">
				<DialogHeader className="px-4">
					<DialogTitle>
						{heading}
						<span className="text-sm font-normal text-black/60">
							(Step {currentIndex + 1} of {steps.length})
						</span>
					</DialogTitle>
				</DialogHeader>
				<DialogDescription />
				<div>
					<StepperNavigation
						stepper={stepper}
						currentIndex={currentIndex}
					/>
					<div className="space-y-1">
						{stepper.switch({
							parent: () => (
								<div className="px-4">
									<PetParent
										setValue={setValue}
										selectedParentId={selectedParentId}
									/>
								</div>
							),
							pet: () => (
								<div className="px-4">
									<Pet
										setValue={setValue}
										selectedParentId={
											selectedParentId ?? ''
										}
										selectedPetId={selectedPetId}
									/>
								</div>
							),
						})}
						<div className="flex justify-end gap-4 shadow-top px-4 py-2">
							<Button
								type="button"
								variant="secondary"
								onClick={stepper.prev}
								disabled={stepper.isFirst}
								className="px-16"
							>
								Back
							</Button>
							<Button onClick={handleNext} className="px-16">
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
		<nav className="group my-4 px-4">
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
								className={`mx-3 flex-1 ${index < currentIndex ? 'bg-primary h-[2px]' : 'bg-muted'}`}
							/>
						)}
					</Fragment>
				))}
			</ol>
		</nav>
	);
}
