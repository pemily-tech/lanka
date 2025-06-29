import { type InputHTMLAttributes } from 'react';

import Input from './input';

export interface FloatingInputProps
	extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	id: string;
	className?: string;
	isError?: boolean;
}

export const FloatingInput = ({
	type,
	label,
	id,
	className = '',
	isError = false,
	...props
}: FloatingInputProps) => {
	return (
		<div className="group relative text-sm">
			<label
				htmlFor={id}
				className={`origin-start text-muted-foreground/70 group-focus-within:text-primary has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-3 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium ${
					isError && '!text-destructive'
				}`}
			>
				<span className="bg-background inline-flex px-1">{label}</span>
			</label>
			<Input
				id={id}
				type={type}
				className={`${
					isError &&
					'border-destructive/80 text-destructive focus-visible:border-destructive'
				} ${className}`}
				placeholder=""
				{...props}
			/>
		</div>
	);
};

export default FloatingInput;
