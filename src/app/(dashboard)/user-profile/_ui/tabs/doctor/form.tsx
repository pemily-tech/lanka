import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useUpdateDoctor } from '../../../_api/use-update-doctor';

import { queryClient } from '@/services/providers';
import { type IDoctor } from '@/types/common';
import { Button } from '@/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/ui/form';
import { FloatingInput } from '@/ui/input';

const schema = z.object({
	name: z.string().nonempty('Name is required'),
	degree: z.string().nonempty('Degree is required'),
	experience: z.string().nonempty('Experience in years is required'),
	speciality: z.string().nonempty('Speciality is required'),
	regNo: z.string().nonempty('Registration No. is required'),
});

type IFormData = z.infer<typeof schema>;

export default function DoctorForm({ doctor }: { doctor: IDoctor }) {
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			name: doctor?.name || '',
			degree: doctor?.degree || '',
			experience: doctor?.experience.toString() || '',
			speciality: doctor?.speciality || '',
			regNo: doctor?.regNo || '',
		},
	});
	const { mutateAsync: updateDoctor } = useUpdateDoctor(doctor?.doctorId);

	const onSubmit = async (values: IFormData) => {
		const response = await updateDoctor(values);
		if (response?.status === 'SUCCESS') {
			queryClient.invalidateQueries({
				queryKey: ['clinic/doctors'],
			});
		}
	};

	return (
		<Form {...form}>
			<h4 className="text-black-1/80 mb-24 font-semibold">
				Doctor Details:
			</h4>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="rounded-12 grid flex-1 grid-cols-2 gap-24 bg-white"
			>
				{[
					['name', 'Name', 'text'],
					['degree', 'Degree', 'text'],
					['experience', 'Experience', 'text'],
					['speciality', 'Speciality', 'text'],
					['regNo', 'RegNo.', 'text'],
				].map(([name, label, type]) => {
					return (
						<FormField
							key={name}
							control={form.control}
							name={name as keyof IFormData}
							render={({ field, fieldState }) => (
								<FormItem className="relative">
									<FormControl>
										<FloatingInput
											label={label}
											id={name}
											isError={!!fieldState.error}
											type={type || 'text'}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					);
				})}
				<Button
					// disabled={isPending}
					// loading={isPending}
					className="col-span-2 max-w-[240px]"
				>
					Submit
				</Button>
			</form>
		</Form>
	);
}
