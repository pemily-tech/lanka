/* eslint-disable indent */
import { Check, ChevronsUpDown } from 'lucide-react';

import { useGetPetBreed } from '@/api/queries/use-get-pet-breed';
import { cn } from '@/helpers/utils';
import { Button } from '@/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/ui/command';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';

export function Combobox({
	form,
	name,
	label,
	selectedType,
}: {
	form: any;
	name: string;
	label: string;
	selectedType: string;
}) {
	const { data } = useGetPetBreed({ type: selectedType });
	const breedsData =
		data?.data?.breeds || ([] as { label: string; value: string }[]);

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className="flex flex-col">
					<FormLabel>{label}</FormLabel>
					<Popover>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									variant="outline"
									role="combobox"
									className={cn(
										'!mt-6 h-48 justify-between font-normal',
										!field.value && 'text-muted-foreground'
									)}
									disabled={!selectedType}
								>
									{field.value
										? breedsData.find(
												(breed) =>
													breed.value === field.value
											)?.label
										: 'Select Breed'}
									<ChevronsUpDown className="size-16 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent
							style={{
								width: 'var(--radix-popover-trigger-width)',
							}}
						>
							<Command>
								<CommandInput
									placeholder="Search for Breeds..."
									className="h-42"
								/>
								<CommandList>
									<CommandEmpty>No breed found.</CommandEmpty>
									<CommandGroup>
										{breedsData.map((breed) => (
											<CommandItem
												value={breed.label}
												key={breed.value}
												onSelect={() => {
													form.setValue(
														'breed',
														breed.value
													);
												}}
											>
												{breed.label}
												<Check
													className={cn(
														'ml-auto',
														breed.value ===
															field.value
															? 'opacity-100'
															: 'opacity-0'
													)}
												/>
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
