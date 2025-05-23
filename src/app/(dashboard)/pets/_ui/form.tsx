'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { FloatingInput } from '../../../../ui/shared';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '../../../../ui/shared/form';
import { useCreatePet } from '../create/_api/use-create-pet';
import { CalendarType } from './calendar';
import { Combobox } from './combobox';
import { formFields } from './fields';
import { type IPetFormData, petSchema } from './schema';
import { SelectType } from './select';

import { DEFAULT_DATE_FORMAT } from '@/helpers/constant';
import { cn } from '@/helpers/utils';
import { queryClient } from '@/services/providers';
import { Button } from '@/ui/shared/button';

export function PetForm({ type }: { type: 'add' | 'edit' }) {
	const params = useParams<{ id: string }>();
	const searchParams = useSearchParams();
	const parentId = searchParams.get('parentId');
	const router = useRouter();

	const { mutateAsync: createPet, isPending: createLoading } = useCreatePet();

	const form = useForm<IPetFormData>({
		resolver: zodResolver(petSchema),
		defaultValues: {
			name: '',
			type: '',
			gender: '',
			breed: '',
			dob: '',
			microChipNo: '',
		},
	});
	const selectedType = form.watch('type');

	const onSubmit = async (values: IPetFormData) => {
		const { dob, ...rest } = values;
		const commonInvalidateQuery = () =>
			queryClient.invalidateQueries({
				queryKey: [
					'clinic/parents',
					{ searchTerm: '', limit: 15, page: 0, count: 1 },
				],
			});

		const response = await createPet({
			...rest,
			parentId: parentId as string,
			dob: dob ? format(new Date(dob), DEFAULT_DATE_FORMAT) : '',
		});
		if (response.status === 'SUCCESS') {
			router.back();
			commonInvalidateQuery();
		}
	};

	return (
		<div className="rounded-8 shadow-card1 col-span-2 max-w-2xl bg-white p-16">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="grid grid-cols-2 gap-24"
				>
					{formFields.map(({ name, label, type, options }, i) => {
						if (type === 'select' && Array.isArray(options)) {
							return (
								<SelectType
									key={i}
									form={form}
									options={options}
									name={name}
									label={label}
								/>
							);
						} else if (type === 'calendar') {
							return (
								<CalendarType
									key={i}
									form={form}
									name={name}
									label={label}
								/>
							);
						} else if (type === 'combobox') {
							return (
								<Combobox
									key={i}
									form={form}
									name={name}
									label={label}
									selectedType={selectedType}
								/>
							);
						}
						return (
							<FormField
								key={i}
								control={form.control}
								name={name as keyof IPetFormData}
								render={({ field, fieldState }) => (
									<FormItem
										className={cn(
											'relative',
											(name === 'name' ||
												name === 'microChipNo') &&
												'pt-[26px]'
										)}
									>
										<FormControl>
											<FloatingInput
												label={label}
												id={name}
												isError={!!fieldState.error}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						);
					})}
					<div className="col-span-2">
						<Button
							disabled={createLoading}
							loading={createLoading}
							loadingText={
								type === 'edit'
									? 'Updating pet...'
									: 'Adding Pet'
							}
							type="submit"
							className="w-[240px] font-normal"
						>
							{type === 'edit' ? 'Update Pet' : 'Add Pet'}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
