'use client';

import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { z } from 'zod';

import { type ISoap } from '../../../../../types/prescription';
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
import { useGetPrescriptionSoap } from '../_api/use-get-soap';
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
	const { data, isPending, refetch } = useGetPrescriptionSoap(
		params?.precriptionNo as string
	);
	const soapData = useMemo(() => {
		return data?.data?.soap?.soap || ({} as ISoap);
	}, [data?.data?.soap]);
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
		if (soapData) {
			form.reset({
				subjective: soapData?.subjective ?? '',
				objective: soapData?.objective ?? '',
				assessment: soapData?.assessment ?? '',
				plan: soapData?.plan ?? '',
			});
		}
	}, [form, soapData]);

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
		<div className="my-24 pr-16">
			<h3 className="font-semibold">SOAP</h3>
			<Form className="mt-12" {...form}>
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
