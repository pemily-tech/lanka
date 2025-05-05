'use client';

import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { z } from 'zod';

import { type IPrescription } from '../../../../../types/prescription';
import {
	Button,
	FloatingTextArea,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Spinner,
} from '../../../../../ui/shared';
import { useGetPrescriptionById } from '../_api/use-get-byid';
import { useUpdateSoap } from '../_api/use-update.soap';

const schema = z.object({
	subjective: z.string().optional().or(z.literal('')),
	objective: z.string().optional().or(z.literal('')),
	assessment: z.string().optional().or(z.literal('')),
	plan: z.string().optional().or(z.literal('')),
});

type IFormData = z.infer<typeof schema>;

export default function Soap() {
	const params = useParams();
	const { data, isPending, refetch } = useGetPrescriptionById(
		params?.precriptionNo as string
	);
	const prescriptionData = useMemo(() => {
		return data?.data?.prescription || ({} as IPrescription);
	}, [data?.data?.prescription]);
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			subjective: '',
			objective: '',
			assessment: '',
			plan: '',
		},
	});
	const { mutateAsync: updateSoap, isPending: isLoading } = useUpdateSoap(
		params?.precriptionNo as string
	);

	useEffect(() => {
		if (prescriptionData.soap) {
			form.reset({
				subjective: prescriptionData?.soap?.subjective ?? '',
				objective: prescriptionData?.soap?.objective ?? '',
				assessment: prescriptionData?.soap?.assessment ?? '',
				plan: prescriptionData?.soap?.plan ?? '',
			});
		}
	}, [form, prescriptionData]);

	const onSubmit = async (values: IFormData) => {
		const response = await updateSoap(values);
		if (response.status === 'SUCCESS') {
			refetch();
		}
	};

	if (isPending) {
		return <Spinner className="mt-12" />;
	}

	return (
		<div className=" my-24 px-16">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="grid grid-cols-1 gap-24"
				>
					{[
						['subjective', 'Subjective'],
						['objective', 'Objective'],
						['assessment', 'Assessment'],
						['plan', 'Plan'],
					].map(([name, label]) => {
						return (
							<FormField
								key={name}
								control={form.control}
								name={name as keyof IFormData}
								render={({ field: inputField, fieldState }) => (
									<FormItem className="relative col-span-1">
										<FormControl>
											<FloatingTextArea
												label={label}
												id={name}
												isError={!!fieldState.error}
												{...inputField}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						);
					})}
					<Button
						loading={isLoading}
						disabled={isLoading}
						className="col-span-1"
					>
						Update
					</Button>
				</form>
			</Form>
		</div>
	);
}
