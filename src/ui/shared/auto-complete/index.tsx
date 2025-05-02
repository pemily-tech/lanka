import {
	type KeyboardEvent,
	type ReactNode,
	useCallback,
	useRef,
	useState,
} from 'react';
import { Check } from 'lucide-react';

import { cn } from '../../../helpers/utils';
import {
	Command as CommandPrimitive,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '../command';
import { Skeleton } from '../skeleton';

export type AutoCompleteOption = {
	label: string;
	value: string;
	[key: string]: any;
};

type AutoCompleteProps<T extends AutoCompleteOption> = {
	options: T[];
	emptyMessage: string;
	value?: T;
	onValueChange?: (value: T) => void;
	isLoading?: boolean;
	disabled?: boolean;
	placeholder?: string;
	children: ReactNode;
};

export const AutoComplete = <T extends AutoCompleteOption>({
	options,
	placeholder,
	emptyMessage,
	value,
	onValueChange,
	disabled,
	isLoading = false,
	children,
}: AutoCompleteProps<T>) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [isOpen, setOpen] = useState(false);
	const [selected, setSelected] = useState<T | undefined>(value);
	const [inputValue, setInputValue] = useState<string>(value?.label || '');

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			const input = inputRef.current;
			if (!input) return;

			if (!isOpen) setOpen(true);

			if (event.key === 'Enter' && input.value !== '') {
				const optionToSelect = options.find(
					(option) => option.label === input.value
				);
				if (optionToSelect) {
					setSelected(optionToSelect);
					onValueChange?.(optionToSelect);
				}
			}

			if (event.key === 'Escape') input.blur();
		},
		[isOpen, options, onValueChange]
	);

	const handleBlur = useCallback(() => {
		setOpen(false);
		setInputValue(selected?.label || '');
	}, [selected]);

	const handleSelectOption = useCallback(
		(option: T) => {
			setInputValue(option.label);
			setSelected(option);
			onValueChange?.(option);
			setTimeout(() => {
				inputRef.current?.blur();
			}, 0);
		},
		[onValueChange]
	);

	return (
		<CommandPrimitive onKeyDown={handleKeyDown}>
			<div>
				<CommandInput
					ref={inputRef}
					value={inputValue}
					onValueChange={isLoading ? undefined : setInputValue}
					onBlur={handleBlur}
					onFocus={() => setOpen(true)}
					placeholder={placeholder}
					disabled={disabled}
					className="text-14"
				/>
			</div>
			<div className="relative mt-1">
				<div
					className={cn(
						'animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 block w-full rounded-xl bg-white outline-none',
						isOpen ? 'block' : 'hidden'
					)}
				>
					<CommandList className="rounded-lg ring-1 ring-slate-200">
						{isLoading && (
							<div className="p-1">
								<Skeleton className="h-8 w-full" />
							</div>
						)}

						{!isLoading && options.length > 0 && (
							<CommandGroup>
								{children}
								{/* {options.map((option) => {
									const isSelected =
										selected?.value === option.value;
									console.log(option);

									return (
										<CommandItem
											key={option.value}
											value={option.label}
											onMouseDown={(e) => {
												e.preventDefault();
												e.stopPropagation();
											}}
											onSelect={() =>
												handleSelectOption(option)
											}
											className={cn(
												'flex w-full items-center gap-2',
												!isSelected ? 'pl-8' : null
											)}
										>
											{renderOption ? (
												renderOption(option, isSelected)
											) : (
												<>
													{isSelected && (
														<Check className="w-4" />
													)}
													{option.label}
												</>
											)}
										</CommandItem>
									);
								})} */}
							</CommandGroup>
						)}

						{!isLoading && options.length === 0 && (
							<CommandEmpty className="select-none rounded-sm px-2 py-3 text-center text-sm">
								{emptyMessage}
							</CommandEmpty>
						)}
					</CommandList>
				</div>
			</div>
		</CommandPrimitive>
	);
};
