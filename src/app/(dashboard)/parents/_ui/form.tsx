/* eslint-disable indent */
'use client';

import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { z } from 'zod';

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../../../ui/form';
import { FloatingInput } from '../../../../ui/input';
import { useGetParentById } from '../_api/use-get-parent-byid';
import { useCreateParent } from '../create/_api/use-create-parent';
import { useUpdateParent } from '../update/[id]/_api/use-update-parent';

import { AppConstants } from '@/helpers/primitives';
import { cn, phoneValidator } from '@/helpers/utils';
import { queryClient } from '@/services/providers';
import { Button } from '@/ui/button';
import { Switch } from '@/ui/switch';

const getValidationSchema = (type: 'add' | 'edit') =>
	z.object({
		mobileNumber: z
			.string()
			.regex(phoneValidator, 'Phone number is not valid')
			.nonempty('Phone number is required'),
		name:
			type === 'edit'
				? z.string().nonempty('Name is required')
				: z.string().optional(),
		comment: z.string().optional(),
		active: z.boolean().optional(),
	});

type FormSchema = ReturnType<typeof getValidationSchema>;
type IFormData = z.infer<FormSchema>;

export function ParentForm({ type }: { type: 'add' | 'edit' }) {
	const params = useParams<{ id: string }>();
	const schema = useMemo(() => getValidationSchema(type), [type]);
	const { mutateAsync: createParent, isPending: createPending } =
		useCreateParent();
	const { data } = useGetParentById(params?.id as string);
	const parentData = data?.data?.parents?.[0];
	const { mutateAsync: updateParent, isPending: updatePending } =
		useUpdateParent({ memberId: parentData?.memberId as string });

	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			mobileNumber: parentData?.parent?.mobile ?? '',
			name: parentData?.parent?.name ?? '',
			comment: parentData?.comment ?? '',
			active: parentData?.active ?? true,
		},
	});

	useEffect(() => {
		if (type === 'edit' && parentData) {
			form.reset({
				mobileNumber: parentData?.parent?.mobile ?? '',
				name: parentData?.parent?.name ?? '',
				comment: parentData?.comment ?? '',
				active: parentData?.active ?? true,
			});
		}
	}, [form, parentData, type]);

	const onSubmit = async (values: IFormData) => {
		const commonInvalidateQuery = () =>
			queryClient.invalidateQueries({
				queryKey: [
					'clinic/parents',
					{ searchTerm: '', limit: 15, page: 0, count: 1 },
				],
			});

		if (type === 'add') {
			const res = await createParent({
				mobileNumber: values.mobileNumber!,
				name: values.name,
			});
			if (res.status === AppConstants.Success) commonInvalidateQuery();
		} else {
			const res = await updateParent({
				name: values.name,
				comment: values.comment,
				active: values.active as boolean,
				mobile: Number(values.mobileNumber),
			});
			if (res.status === AppConstants.Success) commonInvalidateQuery();
		}
	};

	return (
		<div
			className={cn(
				'shadow-card col-span-2 rounded-lg bg-white p-4',
				type === 'add' && 'max-w-2xl'
			)}
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="mt-1 grid grid-cols-2 gap-6"
				>
					{[
						['mobileNumber', 'Mobile Number'],
						['name', 'Name'],
						...(type === 'edit'
							? [['comment', 'Comment'] as const]
							: []),
					].map(([name, label], i) => (
						<FormField
							key={i}
							control={form.control}
							name={name as keyof IFormData}
							render={({ field, fieldState }) => (
								<FormItem className="relative">
									<FormControl>
										<FloatingInput
											label={label}
											id={name}
											isError={!!fieldState.error}
											{...(field as any)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					))}
					{type === 'edit' && (
						<FormField
							control={form.control}
							name="active"
							render={({ field: switchField }) => (
								<FormItem className="flex flex-row items-center gap-3">
									<div className="space-y-2">
										<FormLabel className="text-sm">
											Choose Active/InActive
										</FormLabel>
										<FormDescription>
											You have make the field
											Active/InActive
										</FormDescription>
									</div>
									<FormControl>
										<Switch
											checked={switchField.value}
											onCheckedChange={
												switchField.onChange
											}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					)}
					<div className="col-span-2">
						<Button
							disabled={createPending || updatePending}
							loading={createPending || updatePending}
							type="submit"
							className="w-[240px]"
						>
							{type === 'edit'
								? 'Update Parent'
								: 'Create Parent'}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
