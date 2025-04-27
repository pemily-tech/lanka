import { useState } from 'react';
import { type UseFormSetValue } from 'react-hook-form';

import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '../command';

export default function Doctor({
	setValue,
}: {
	setValue: UseFormSetValue<any>;
}) {
	const [value, setSearchValue] = useState('');

	const handleSelectDoctor = (id: string) => {
		setValue('doctorId', id);
	};

	return (
		<Command className="mb-16 mt-32 rounded-lg border shadow-md md:min-w-[450px]">
			<CommandInput
				className="py-24"
				placeholder="Search for doctors..."
				value={value}
				onValueChange={setSearchValue}
			/>
		</Command>
	);
}
