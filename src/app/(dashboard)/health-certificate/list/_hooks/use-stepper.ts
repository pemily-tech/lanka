import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';

import { defineStepper } from '@/ui/stepper';

const { useStepper, steps, utils } = defineStepper(
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
	parentId: z.string().optional(),
	petId: z.string().optional(),
});
export type FormValues = z.infer<typeof FormSchema>;

export function useSelectionStepper({
	onComplete,
}: {
	onComplete: ({
		parentId,
		petId,
	}: {
		parentId: string;
		petId: string;
	}) => void;
}) {
	const stepper = useStepper();
	const currentIndex = utils.getIndex(stepper.current.id);

	const { register, setValue, getValues, watch } = useForm<FormValues>({
		defaultValues: {
			parentId: '',
			petId: '',
		},
		resolver: zodResolver(FormSchema),
		mode: 'onChange',
	});
	const selectedParentId = watch('parentId');
	const selectedPetId = watch('petId');
	const router = useRouter();

	const handleNext = async () => {
		const currentSchema = stepper.current.schema;
		const currentValues = getValues();

		try {
			await currentSchema.parseAsync(currentValues);
			if (stepper.isLast) {
				if (selectedParentId && selectedPetId) {
					await onComplete({
						parentId: selectedParentId,
						petId: selectedPetId,
					});
					stepper.reset();
					const payload = {
						parentId: selectedParentId,
						patientId: selectedPetId,
					};
					// const response = await createPrescription(payload);
					// if (response.status === AppConstants.Success) {
					// 	router.push(
					// 		`/prescription/${response.data.prescription.prescriptionNo}`
					// 	);
					// 	stepper.reset();
					// 	onComplete();
					// }
				}
			} else {
				stepper.next();
			}
		} catch (error) {
			if (stepper.current.id === 'parent') {
				toast.error('Select a parent to proceed');
			}
			if (stepper.current.id === 'pet') {
				toast.error('Select a pet to proceed');
			}
		}
	};

	return {
		stepper,
		steps,
		currentIndex,
		handleNext,
		register,
		setValue,
		selectedParentId,
		selectedPetId,
	};
}
