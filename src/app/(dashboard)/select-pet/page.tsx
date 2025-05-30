'use client';

import { Fragment } from 'react';
import { useSearchParams } from 'next/navigation';

import FollowupForm from '../follow-up/_ui/form';
import MedicalRecordForm from '../medical-records/_ui/form';
import VaccinationForm from '../vaccination-records/_ui/form';
import { useStepperHook } from './_hooks/use-stepper';
import Pet from './_ui/pet';
import PetParent from './_ui/pet-parent';

import { RecordTypes } from '@/helpers/primitives';
import { cn } from '@/helpers/utils';
import { type IMedicalRecordFilter } from '@/types/common';
import { Button } from '@/ui/shared/button';
import { Separator } from '@/ui/shared/separator';

export default function Page() {
	const searchParams = useSearchParams();
	const recordType = searchParams.get('recordType');
	const medicalRecordFilterType = searchParams.get(
		'filter'
	) as IMedicalRecordFilter | null;

	const {
		currentIndex,
		stepper,
		setValue,
		selectedParentId,
		selectedPetId,
		handleNext,
	} = useStepperHook({ type: recordType as string });

	return (
		<div className="shadow-card1 my-12 rounded-lg bg-white">
			<StepperNavigation stepper={stepper} currentIndex={currentIndex} />
			<div className="mb-12 h-[calc(100vh-240px)] space-y-4">
				{stepper.switch({
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
					record: () => {
						if (recordType === RecordTypes.Followup) {
							return (
								<FollowupForm
									stepper={stepper}
									parentId={selectedParentId as string}
									petId={selectedPetId as string}
								/>
							);
						}
						if (recordType === RecordTypes.Vaccination) {
							return (
								<VaccinationForm
									stepper={stepper}
									parentId={selectedParentId as string}
									petId={selectedPetId as string}
								/>
							);
						}
						if (recordType === RecordTypes.Medical) {
							return (
								<MedicalRecordForm
									stepper={stepper}
									parentId={selectedParentId as string}
									petId={selectedPetId as string}
									filterType={
										medicalRecordFilterType as IMedicalRecordFilter
									}
								/>
							);
						}
						return <div>Unknown record type</div>;
					},
				})}
			</div>
			{!stepper.isLast && (
				<div className="shadow-top sticky bottom-0 flex w-full justify-end gap-16 rounded-b-lg bg-white px-24 py-16">
					<Button
						type="button"
						variant="secondary"
						onClick={stepper.prev}
						disabled={stepper.isFirst}
						className="w-[240px]"
					>
						Back
					</Button>
					<Button onClick={handleNext} className="w-[240px]">
						{stepper.isLast ? 'Done' : 'Next'}
					</Button>
				</div>
			)}
		</div>
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
		<nav className="group my-4 px-16 pt-24">
			<ol className="flex items-center justify-between gap-2">
				{stepper.all.map((step: any, index: number, array: any[]) => (
					<Fragment key={step.id}>
						<li className="flex shrink-0 items-center gap-4">
							<div
								className={cn(
									'flex size-32 items-center justify-center rounded-full',
									index <= currentIndex
										? 'bg-primary text-white'
										: 'bg-black-1/30'
								)}
							>
								{index + 1}
							</div>
							<span className="text-sm font-medium">
								{step.label}
							</span>
						</li>
						{index < array.length - 1 && (
							<Separator
								className={`mx-12 flex-1 ${index < currentIndex ? 'bg-primary h-[2px]' : 'bg-black-1/30'}`}
							/>
						)}
					</Fragment>
				))}
			</ol>
		</nav>
	);
}
