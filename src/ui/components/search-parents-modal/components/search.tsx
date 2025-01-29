import { type ChangeEvent, memo } from 'react';
import { MoveDown, MoveUp, SearchIcon, X } from 'lucide-react';

import { Button } from '../../../shared/button';

function Search({
	value,
	onChange,
	onClear,
}: {
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onClear: () => void;
}) {
	return (
		<div className="focus-within:ring-primary-1 rounded-8 bg-white focus-within:ring-2 focus-within:ring-offset-2">
			<div className="flex items-center px-16 py-12">
				<div className="flex flex-1 items-center">
					<SearchIcon className="w-18 h-18" />
					<input
						value={value}
						onChange={onChange}
						className="rounded-8 w-full pl-12 focus:outline-none"
						placeholder="Search for Parents, pets..."
					/>
				</div>
				{value.length > 0 && (
					<Button
						onClick={onClear}
						className="bg-black-1 flex size-16 items-center justify-center rounded-full"
						variant="ghost"
						size="icon"
					>
						<X className="text-white" />
					</Button>
				)}
			</div>
			<div className="bg-green-3 rounded-bl-8 rounded-br-8 flex items-center justify-between gap-12 px-16 py-8">
				<div className="flex gap-6">
					<span className="text-14">Navigate</span>
					<div className="rounded-8 border-grey-divider flex size-24 items-center justify-center border bg-white p-4">
						<MoveUp className="w-18 h-18" />
					</div>
					<div className="rounded-8 border-grey-divider flex size-24 items-center justify-center border bg-white p-4">
						<MoveDown />
					</div>
				</div>
				<div className="flex items-center gap-6">
					<span className="text-14">Close</span>
					<div className="rounded-8 border-grey-divider flex items-center justify-center border bg-white px-4">
						<span className="text-12">esc</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default memo(Search);
