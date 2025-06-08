'use client';

import { Fragment } from 'react';
import { useSearchParams } from 'next/navigation';

import FollowupForm from '../follow-up/_ui/form';
import VaccinationForm from '../vaccination-records/_ui/form';
import { useStepperHook } from './_hooks/use-stepper';
import Pet from './_ui/pet';
import PetParent from './_ui/pet-parent';

import MedicalRecordForm from '@/components/medical-records/form';
import { RecordTypes } from '@/helpers/primitives';
import { cn } from '@/helpers/utils';
import { type IMedicalRecordFilter } from '@/types/common';
import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';

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
		onFinish,
	} = useStepperHook({ type: recordType as string });

	return (
		<div className="my-3 rounded-lg bg-white shadow-md">
			<StepperNavigation stepper={stepper} currentIndex={currentIndex} />
			<div className="mb-3 h-[calc(100vh-240px)] space-y-4">
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
						switch (recordType) {
							case RecordTypes.Followup:
								return (
									<FollowupForm
										stepper={stepper}
										parentId={selectedParentId as string}
										petId={selectedPetId as string}
									/>
								);
							case RecordTypes.Vaccination:
								return (
									<VaccinationForm
										stepper={stepper}
										parentId={selectedParentId as string}
										petId={selectedPetId as string}
										onFinish={onFinish}
									/>
								);
							case RecordTypes.Medical:
								return (
									<MedicalRecordForm
										stepper={stepper}
										parentId={selectedParentId as string}
										petId={selectedPetId as string}
										filterType={
											medicalRecordFilterType as IMedicalRecordFilter
										}
										onFinish={onFinish}
									/>
								);
							default:
								return <div>Unknown record type</div>;
						}
					},
				})}
			</div>
			{!stepper.isLast && (
				<div className="shadow-top sticky bottom-0 flex w-full justify-end gap-4 rounded-b-lg bg-white px-6 py-4">
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
		<nav className="group my-4 px-4 pt-4">
			<ol className="flex items-center justify-between gap-2">
				{stepper.all.map((step: any, index: number, array: any[]) => (
					<Fragment key={step.id}>
						<li className="flex shrink-0 items-center gap-4">
							<div
								className={cn(
									'flex size-8 items-center justify-center rounded-full',
									index <= currentIndex
										? 'bg-primary text-white'
										: 'bg-black/20'
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
								className={`mx-3 flex-1 ${index < currentIndex ? 'bg-primary h-[2px]' : 'bg-black/20'}`}
							/>
						)}
					</Fragment>
				))}
			</ol>
		</nav>
	);
}
