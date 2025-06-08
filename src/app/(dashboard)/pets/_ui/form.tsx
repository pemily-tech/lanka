/* eslint-disable max-lines-per-function */
'use client';

import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '../../../../ui/form';
import { FloatingInput } from '../../../../ui/input';
import { useCreatePet } from '../create/_api/use-create-pet';
import { useUpdatePet } from '../update/[id]/_api/use-update-parent';
import { CalendarType } from './calendar';
import { Combobox } from './combobox';
import { formFields } from './fields';
import { type IPetFormData, petSchema } from './schema';
import { SelectType } from './select';

import { useGetPetById } from '@/api/queries/use-get-pet-byid';
import { DEFAULT_DATE_FORMAT } from '@/helpers/constant';
import { cn } from '@/helpers/utils';
import { queryClient } from '@/services/providers';
import { type IPetItem } from '@/types/common';
import { Button } from '@/ui/button';

export function PetForm({ type }: { type: 'add' | 'edit' }) {
	const params = useParams<{ id: string }>();
	const searchParams = useSearchParams();
	const parentId = searchParams.get('parentId');
	const router = useRouter();
	const { data } = useGetPetById(params?.id);
	const petData = useMemo(() => {
		return data?.data?.pet || ({} as IPetItem);
	}, [data?.data?.pet]);

	const { mutateAsync: createPet, isPending: createLoading } = useCreatePet();
	const { mutateAsync: updatePet, isPending: updateLoading } = useUpdatePet(
		params?.id
	);

	const form = useForm<IPetFormData>({
		resolver: zodResolver(petSchema),
		defaultValues: {
			name: petData?.name ?? '',
			type: petData?.type ?? '',
			gender: petData?.gender ?? '',
			breed: petData?.breed ?? '',
			dob: petData?.dob ?? '',
			microChipNo: petData?.microChipNo ?? '',
		},
	});
	const selectedType = form.watch('type');

	useEffect(() => {
		if (type === 'edit' && petData) {
			form.reset({
				name: petData?.name ?? '',
				type: petData?.type ?? '',
				gender: petData?.gender ?? '',
				breed: petData?.breed ?? '',
				dob: petData?.dob ?? '',
				microChipNo: petData?.microChipNo ?? '',
			});
		}
	}, [type, form, petData]);

	const onSubmit = async (values: IPetFormData) => {
		const { dob, ...rest } = values;
		const commonInvalidateQuery = () =>
			queryClient.invalidateQueries({
				queryKey: [
					'clinic/parents',
					{ searchTerm: '', limit: 15, page: 0, count: 1 },
				],
			});
		if (type === 'add') {
			const response = await createPet({
				...rest,
				parentId: parentId as string,
				dob: dob ? format(new Date(dob), DEFAULT_DATE_FORMAT) : '',
			});
			if (response.status === 'SUCCESS') {
				router.back();
				commonInvalidateQuery();
			}
		} else {
			const response = await updatePet({
				...rest,
				dob: dob ? format(new Date(dob), DEFAULT_DATE_FORMAT) : '',
			});
			if (response.status === 'SUCCESS') {
				commonInvalidateQuery();
			}
		}
	};

	return (
		<div className="col-span-2 max-w-2xl rounded-lg bg-white p-4 shadow-md">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="grid grid-cols-2 gap-6"
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
							disabled={createLoading || updateLoading}
							loading={createLoading || updateLoading}
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
