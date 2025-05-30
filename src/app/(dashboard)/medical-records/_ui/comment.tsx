import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { z } from 'zod';

import { useUpdateMedicalRecord } from '../_api/use-update-medical-record';

import { AppConstants } from '@/helpers/primitives';
import { queryClient } from '@/services/providers';
import { type IMedicalRecord } from '@/types/clinic';
import { type IMedicalRecordFilter } from '@/types/common';
import { Button } from '@/ui/shared/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/ui/shared/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/ui/shared/form';
import { FloatingTextArea } from '@/ui/shared/text-area';

const schema = z.object({
	comment: z.string().nonempty('Comment is required'),
});

type IFormData = z.infer<typeof schema>;

export default function Status({
	record,
	type,
	date,
}: {
	record: IMedicalRecord;
	type: IMedicalRecordFilter;
	date: string;
}) {
	const [open, setOpen] = useState(false);
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			comment: record.comment ?? '',
		},
	});
	const { mutateAsync: updateMedicalRecord, isPending } =
		useUpdateMedicalRecord({ id: record._id });

	const onSubmit = async (values: IFormData) => {
		const payload = {
			type,
			comment: values.comment,
		};
		const response = await updateMedicalRecord(payload);
		if (response.status === AppConstants.Success) {
			queryClient.invalidateQueries({
				queryKey: ['clinic/medicalRecords', type, undefined, date],
			});
		}
	};

	return (
		<Dialog open={open} onOpenChange={() => setOpen(!open)}>
			<DialogTrigger asChild>
				<Button variant="ghost" size="icon">
					<Pencil className="size-16" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Comment</DialogTitle>
				</DialogHeader>
				<DialogDescription />
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="grid grid-cols-1"
					>
						<FormField
							control={form.control}
							name="comment"
							render={({ field: inputField, fieldState }) => (
								<FormItem className="relative col-span-1">
									<FormControl>
										<FloatingTextArea
											label="Comment"
											id="comment"
											isError={!!fieldState.error}
											{...inputField}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter className="col-span-2 mt-24 flex gap-24">
							<DialogClose>Cancel</DialogClose>
							<Button
								type="submit"
								size="lg"
								variant="secondary"
								disabled={isPending}
							>
								Confirm
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
