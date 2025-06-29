import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';

import { RecordTypes } from '@/helpers/primitives';
import { defineStepper } from '@/ui/stepper';

const schema = z.object({
	parentId: z.string().optional(),
	petId: z.string().optional(),
});
type IFormdata = z.infer<typeof schema>;

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
					: type === RecordTypes.Vaccination
						? 'Add Vaccination Details'
						: type === RecordTypes.Medical
							? 'Add Medical Record Details'
							: '',
			schema: z.object({}),
		}
	);
	const stepper = useStepper();
	const currentIndex = utils.getIndex(stepper.current.id);
	const router = useRouter();

	const { register, setValue, getValues, watch } = useForm<IFormdata>({
		defaultValues: {
			parentId: '',
			petId: '',
		},
		resolver: zodResolver(schema),
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
			void error;
			if (stepper.current.id === 'parent') {
				toast.error('Please choose a parent to proceed.');
			}
			if (stepper.current.id === 'pet') {
				toast.error('Please choose a pet to proceed.');
			}
		}
	};

	const onFinish = () => {
		router.back();
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
		onFinish,
	};
}
