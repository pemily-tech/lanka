import {
	type KeyboardEvent,
	type ReactNode,
	useCallback,
	useRef,
	useState,
} from 'react';
import { Command as CommandPrimitive } from 'cmdk';

import {
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from './command';

import { cn } from '@/helpers/utils';

type IProps<T> = {
	options: T[];
	emptyMessage: string;
	value?: string;
	onValueChange?: (value: string) => void;
	isLoading?: boolean;
	placeholder?: string;
	renderOption: (option: T) => ReactNode;
	handleDownKey: (value: string) => void;
	handleSelect: (option: T) => void;
	handleBlur: () => void;
};

export const AutoComplete = <T,>({
	options,
	placeholder,
	emptyMessage,
	value,
	onValueChange,
	isLoading = false,
	renderOption,
	handleDownKey,
	handleSelect,
	handleBlur,
}: IProps<T>) => {
	const [isOpen, setOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const onKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			const input = inputRef.current;
			if (!input) return;

			if (!isOpen) setOpen(true);
			if (event.key === 'Enter' && input.value !== '') {
				handleDownKey(input.value);
			}
		},
		[handleDownKey, isOpen]
	);

	const onSelectOption = useCallback(
		(option: T) => {
			handleSelect(option);
			setTimeout(() => {
				inputRef.current?.blur();
			}, 100);
		},
		[handleSelect]
	);

	const onBlur = useCallback(() => {
		setTimeout(() => setOpen(false), 100);
		handleBlur();
	}, [handleBlur]);

	return (
		<CommandPrimitive onKeyDown={onKeyDown}>
			<CommandInput
				ref={inputRef}
				value={value}
				onValueChange={onValueChange}
				onBlur={onBlur}
				onFocus={() => setOpen(true)}
				placeholder={placeholder}
				className="text-sm"
			/>
			<div className="relative w-full">
				<div
					className={cn(
						'animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 block w-full rounded-xl bg-white outline-none',
						isOpen ? 'block' : 'hidden'
					)}
				>
					<CommandList className="border border-border">
						{!isLoading && options.length > 0 && (
							<CommandGroup>
								{options?.map((option, i) => {
									return (
										<CommandItem
											key={i}
											onSelect={() =>
												onSelectOption(option)
											}
											onMouseDown={(e) => {
												e.preventDefault();
												e.stopPropagation();
											}}
											className="cursor-pointer"
										>
											{renderOption(option)}
										</CommandItem>
									);
								})}
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
