import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { defineStepper } from '../../stepper';

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

	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		trigger,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: {
			doctorId: '',
			parentId: '',
			petId: '',
		},
		resolver: zodResolver(FormSchema),
		mode: 'onChange',
	});

	const handleNext = async () => {
		const currentSchema = stepper.current.schema;
		const currentValues = getValues();

		try {
			await currentSchema.parseAsync(currentValues);
			if (stepper.isLast) {
				stepper.reset();
				onComplete();
			} else {
				stepper.next();
			}
		} catch (error) {
			console.error('Validation failed for step:', stepper.current.id);
		}
	};

	const getErrorMessage = () => {
		if (stepper.current.id === 'doctor' && errors.doctorId) {
			return 'Please choose a doctor to proceed';
		}
		if (stepper.current.id === 'parent' && errors.parentId) {
			return 'Please choose a parent to proceed';
		}
		if (stepper.current.id === 'pet' && errors.petId) {
			return 'Please choose a pet to proceed';
		}
		return null;
	};

	return {
		stepper,
		steps,
		currentIndex,
		handleNext,
		getErrorMessage,
		register,
		setValue,
	};
}
