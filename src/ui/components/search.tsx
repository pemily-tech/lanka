import { memo } from 'react';
import { X } from 'lucide-react';

import { Button } from '@/ui/shared/button';

interface SearchProps {
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	handleClear: () => void;
	placeholder?: string;
}

const Search = ({
	handleChange,
	value,
	handleClear,
	placeholder = '',
}: SearchProps) => {
	return (
		<section className="relative mb-12 flex-1">
			<input
				className="text-16 leading-16 rounded-8 focus:ring-brand border-grey-divider h-[56px] w-full border bg-white pl-12 pr-[42px] outline-none transition duration-300
                ease-in-out focus:border-none focus:shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-90"
				placeholder={placeholder}
				onChange={handleChange}
				value={value}
			/>
			{value.length > 0 && (
				<Button
					onClick={handleClear}
					className="bg-black-1 !absolute right-12 top-1/2 flex size-24 -translate-y-1/2 items-center justify-center rounded-full"
					variant="ghost"
					size="icon"
				>
					<X className="text-white" width={14} height={14} />
				</Button>
			)}
		</section>
	);
};

export default memo(Search);
