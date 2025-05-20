import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { defineStepper } from '../../stepper';
import { useCreatePrescription } from '../_api/use-create-prescription';

const { useStepper, steps, utils } = defineStepper(
	{
		id: 'doctor',
		label: 'Choose Doctor',
		schema: z.object({ doctorId: z.string().min(1) }),
	},
	{
		id: 'parent',
		label: 'Choose Parent',
		schema: z.object({ parentId: z.string().min(1) }),
	},
	{
		id: 'pet',
		label: 'Choose Pet',
		schema: z.object({ petId: z.string().min(1) }),
	}
);

const FormSchema = z.object({
	doctorId: z.string().optional(),
	parentId: z.string().optional(),
	petId: z.string().optional(),
});
export type FormValues = z.infer<typeof FormSchema>;

export function usePrescriptionStepper({
	onComplete,
}: {
	onComplete: () => void;
}) {
	const stepper = useStepper();
	const currentIndex = utils.getIndex(stepper.current.id);

	const { register, setValue, getValues, watch } = useForm<FormValues>({
		defaultValues: {
			doctorId: '',
			parentId: '',
			petId: '',
		},
		resolver: zodResolver(FormSchema),
		mode: 'onChange',
	});
	const [doctorError, setDoctorError] = useState(false);
	const [parentError, setParentError] = useState(false);
	const [petError, setPetError] = useState(false);
	const selectedDoctorId = watch('doctorId');
	const selectedParentId = watch('parentId');
	const selectedPetId = watch('petId');
	const { mutateAsync: createPrescription } = useCreatePrescription();
	const router = useRouter();

	const handleNext = async () => {
		const currentSchema = stepper.current.schema;
		const currentValues = getValues();

		try {
			await currentSchema.parseAsync(currentValues);
			if (stepper.current.id === 'doctor') setDoctorError(false);
			if (stepper.current.id === 'parent') setParentError(false);
			if (stepper.current.id === 'pet') setPetError(false);

			if (stepper.isLast) {
				if (selectedParentId && selectedDoctorId && selectedPetId) {
					const payload = {
						parentId: selectedParentId,
						doctorId: selectedDoctorId,
						patientId: selectedPetId,
					};
					const response = await createPrescription(payload);
					if (response.status === 'SUCCESS') {
						router.push(
							`/prescription/${response.data.prescription.prescriptionNo}`
						);
						stepper.reset();
						onComplete();
					}
				}
			} else {
				stepper.next();
			}
		} catch (error) {
			if (stepper.current.id === 'doctor') setDoctorError(true);
			if (stepper.current.id === 'parent') setParentError(true);
			if (stepper.current.id === 'pet') setPetError(true);
		}
	};

	return {
		stepper,
		steps,
		currentIndex,
		handleNext,
		register,
		setValue,
		selectedDoctorId,
		doctorError,
		parentError,
		petError,
		selectedParentId,
		selectedPetId,
	};
}
