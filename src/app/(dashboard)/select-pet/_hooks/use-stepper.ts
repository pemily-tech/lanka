import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';

import { RecordTypes } from '@/helpers/primitives';
import { defineStepper } from '@/ui/stepper';

const FormSchema = z.object({
	parentId: z.string().optional(),
	petId: z.string().optional(),
});
export type FormValues = z.infer<typeof FormSchema>;

export function useStepperHook({ type }: { type: string }) {
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
		},
		{
			id: 'record',
			label:
				type === RecordTypes.Followup
					? 'Add Followup Details'
					: RecordTypes.Vaccination
						? 'Add Vaccination Details'
						: 'Add Medical Record Details',
			schema: z.object({}),
		}
	);
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

	const handleNext = async () => {
		const currentSchema = stepper.current.schema;
		const currentValues = getValues();

		try {
			await currentSchema.parseAsync(currentValues);
			if (!stepper.isLast) {
				stepper.next();
			}
		} catch (error) {
			if (stepper.current.id === 'parent') {
				toast.error('Please choose a parent to proceed.');
			}
			if (stepper.current.id === 'pet') {
				toast.error('Please choose a pet to proceed.');
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
