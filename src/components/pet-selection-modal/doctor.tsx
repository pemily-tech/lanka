import { type MouseEvent, useCallback, useState } from 'react';
import { type UseFormSetValue } from 'react-hook-form';
import debounce from 'lodash.debounce';

import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandList,
} from '../../ui/command';

import { useGetClinicDoctors } from '@/api/queries/use-get-clinic-doctors';
import { cn } from '@/helpers/utils';
import { UserProfile } from '@/ui/profile-image/user';
import Spinner from '@/ui/spinner';

export default function Doctor({
	setValue,
	selectedDoctorId,
}: {
	setValue: UseFormSetValue<any>;
	selectedDoctorId: string | undefined;
}) {
	const [value, setSearchValue] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const { data, isPending } = useGetClinicDoctors({ search: searchTerm });

	const debouncedSearch = useCallback(
		debounce((val: string) => setSearchTerm(val), 500),
		[]
	);

	const handleChange = (val: string) => {
		setSearchValue(val);
		debouncedSearch(val);
	};

	const handleSelectDoctor = async (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		const target = (e.target as HTMLElement).closest(
			'[data-id]'
		) as HTMLElement;
		if (target && target.dataset.id) {
			setValue('doctorId', target.dataset.id);
		}
	};

	return (
		<Command className="mb-16 mt-32 h-[380px] max-h-[380px] rounded-lg border md:min-w-[450px]">
			<CommandInput
				className="py-24"
				placeholder="Search for doctors..."
				value={value}
				onValueChange={handleChange}
			/>
			<CommandList onClick={handleSelectDoctor} className="max-h-full">
				{isPending && <Spinner />}
				{data?.data?.doctors?.map((doctor) => {
					return (
						<div
							className={cn(
								'data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground relative flex cursor-pointer select-none items-center gap-6 border-b px-3 py-8 text-sm outline-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-16 [&_svg]:shrink-0',
								selectedDoctorId === doctor.doctor.doctorId &&
									'bg-primary/20 data-[selected=true]:bg-primary/20'
							)}
							key={doctor._id}
							data-id={doctor.doctor.doctorId}
						>
							<UserProfile
								id={doctor.doctor.doctorId}
								imageClasses="!rounded-lg !size-[54px]"
								iconClasses="!size-[54px]"
							/>
							<div>
								<p className="text-16 text-left font-medium">
									{doctor?.doctor?.name}
								</p>
								<p className="text-left text-sm leading-[30px]">
									{doctor?.doctor?.mobile}
								</p>
							</div>
						</div>
					);
				})}
				{!isPending && data && data?.data?.doctors?.length <= 0 && (
					<CommandEmpty>No results found.</CommandEmpty>
				)}
			</CommandList>
		</Command>
	);
}
