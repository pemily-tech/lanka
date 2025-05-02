import { setTimeout } from 'timers';
import {
	type KeyboardEvent,
	useCallback,
	useMemo,
	useRef,
	useState,
} from 'react';
import debounce from 'lodash.debounce';
import { PencilLine } from 'lucide-react';

import { cn } from '../../../../../helpers/utils';
import { type IMedicine } from '../../../../../types/prescription';
import {
	Button,
	Command as CommandPrimitive,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '../../../../../ui/shared';
import { useGetMedicines } from '../../../medicines/list/_api/use-get-medicines';

export default function Medicines() {
	const [toggleSearch, setToggleSearch] = useState(false);
	const [input, setInput] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [isOpen, setOpen] = useState(false);
	const [selected, setSelected] = useState<IMedicine | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	console.log(selected);

	const debouncedSearch = useCallback(
		debounce((val: string) => setSearchTerm(val), 500),
		[]
	);

	const handleChange = (val: string) => {
		setInput(val);
		debouncedSearch(val);
	};

	const { data, isPending } = useGetMedicines({
		count: 1,
		searchTerm,
		page: 0,
	});
	const medicinesData = useMemo(
		() => data?.data?.medicines || ([] as IMedicine[]),
		[data]
	);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {},
		[]
	);

	const handleSelectOption = useCallback((option: IMedicine) => {
		setInput(option.name);
		setSelected(option);
		setTimeout(() => {
			inputRef.current?.blur();
		}, 100);
	}, []);

	const handleBlur = useCallback(() => {
		setTimeout(() => setOpen(false), 100);
		setInput(selected?.name || '');
	}, [selected]);

	return (
		<div className="border-l px-16 pt-16">
			<div className="flex flex-row items-center gap-8">
				<h4 className="text-16 text-primary font-semibold">
					Medicine (RX)
				</h4>
				<Button
					onClick={() => setToggleSearch(!toggleSearch)}
					className=""
					size="icon"
					variant="ghost"
				>
					<PencilLine className="text-primary size-16" />
				</Button>
			</div>
			{toggleSearch && (
				<div className="mt-12">
					<CommandPrimitive onKeyDown={handleKeyDown}>
						<CommandInput
							ref={inputRef}
							value={input}
							onValueChange={handleChange}
							onBlur={handleBlur}
							onFocus={() => setOpen(true)}
							placeholder="Search for medicines..."
							className="text-14"
						/>
						<div className="relative h-[300px] w-full">
							<div
								className={cn(
									'animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 block w-full rounded-xl bg-white outline-none',
									isOpen ? 'block' : 'hidden'
								)}
							>
								<CommandList className="border">
									{!isPending && medicinesData.length > 0 && (
										<CommandGroup>
											{medicinesData?.map((medicine) => {
												return (
													<CommandItem
														key={medicine._id}
														onSelect={() =>
															handleSelectOption(
																medicine
															)
														}
														onMouseDown={(e) => {
															e.preventDefault();
															e.stopPropagation();
														}}
													>
														<div>
															{medicine.name}
														</div>
													</CommandItem>
												);
											})}
										</CommandGroup>
									)}
									{!isPending &&
										medicinesData.length === 0 && (
											<CommandEmpty className="select-none rounded-sm px-2 py-3 text-center text-sm">
												No results
											</CommandEmpty>
										)}
								</CommandList>
							</div>
						</div>
					</CommandPrimitive>
				</div>
			)}
			<div className="h-[380px]"></div>
		</div>
	);
}
