import { Fragment, type MouseEvent, useState } from 'react';
import { type UseFormSetValue } from 'react-hook-form';

import useGetClinicDoctors from '../../../api/get-clinic-doctors';
import { cn } from '../../../helpers/utils';
import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '../command';
import { UserProfile } from '../profile-image/user';
import Spinner from '../spinner';

export default function Doctor({
	setValue,
	selectedDoctorId,
}: {
	setValue: UseFormSetValue<any>;
	selectedDoctorId: string | undefined;
}) {
	const [value, setSearchValue] = useState('');
	const { data, isPending } = useGetClinicDoctors({ search: value });

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
				onValueChange={setSearchValue}
			/>
			<CommandList onClick={handleSelectDoctor} className="max-h-full">
				{isPending && <Spinner />}
				{data?.data?.doctors?.map((doctor) => {
					return (
						<Fragment key={doctor._id}>
							<CommandItem
								className={cn(
									'flex gap-24',
									selectedDoctorId ===
										doctor.doctor.doctorId &&
										'bg-primary/20'
								)}
								key={doctor._id}
								data-id={doctor.doctor.doctorId}
							>
								<UserProfile
									id={doctor.doctor.doctorId}
									containerClasses="!size-[54px]"
									imageClasses="!rounded-8"
									iconClasses="!size-[54px]"
								/>
								<div>
									<p className="text-16 text-left font-medium">
										{doctor?.doctor?.name}
									</p>
									<p className="text-14 text-left leading-[30px]">
										{doctor?.doctor?.mobile}
									</p>
								</div>
							</CommandItem>
							<CommandSeparator />
						</Fragment>
					);
				})}
				{!isPending && data && data?.data?.doctors?.length <= 0 && (
					<CommandEmpty>No results found.</CommandEmpty>
				)}
			</CommandList>
		</Command>
	);
}
