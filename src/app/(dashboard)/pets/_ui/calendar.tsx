/* eslint-disable indent */
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/helpers/utils';
import { Button } from '@/ui/button';
import { Calendar } from '@/ui/calendar';
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';

export function CalendarType({
	form,
	name,
	label,
}: {
	form: any;
	name: string;
	label: string;
}) {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => {
				const dateValue = field.value
					? new Date(field.value)
					: undefined;

				return (
					<FormItem className="flex flex-col">
						<FormLabel>{label}</FormLabel>
						<Popover>
							<PopoverTrigger asChild>
								<FormControl>
									<Button
										variant={'outline'}
										className={cn(
											'h-12 text-left font-normal',
											!field.value &&
												'text-muted-foreground'
										)}
									>
										{field.value
											? format(
													new Date(field.value),
													'PPP'
												)
											: 'Pick a date'}
										<CalendarIcon className="ml-auto size-6 opacity-50" />
									</Button>
								</FormControl>
							</PopoverTrigger>
							<PopoverContent
								className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width]"
								align="start"
							>
								<Calendar
									mode="single"
									selected={dateValue}
									onSelect={(selectedDate) => {
										field.onChange(
											selectedDate
												? selectedDate.toISOString()
												: ''
										);
									}}
									disabled={(date) =>
										date > new Date() ||
										date < new Date('1900-01-01')
									}
								/>
							</PopoverContent>
						</Popover>
						<FormDescription>
							Your date of birth is used to calculate your age.
						</FormDescription>
						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
}
