import { type TextareaHTMLAttributes } from 'react';

import { Textarea } from './text-area';

export interface FloatingInputProps
	extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string;
	id: string;
	className?: string;
	isError?: boolean;
}

export function FloatingTextArea({
	label,
	id,
	className = '',
	isError = false,
	...props
}: FloatingInputProps) {
	return (
		<div className="group relative">
			<label
				htmlFor={id}
				className={`origin-start text-16 text-muted-foreground/70 group-focus-within:text-12 group-focus-within:text-primary has-[+textarea:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-12 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:font-medium has-[+textarea:not(:placeholder-shown)]:pointer-events-none has-[+textarea:not(:placeholder-shown)]:top-0 has-[+textarea:not(:placeholder-shown)]:cursor-default has-[+textarea:not(:placeholder-shown)]:text-xs has-[+textarea:not(:placeholder-shown)]:font-medium ${
					isError && '!text-destructive'
				}`}
			>
				<span className="bg-background inline-flex px-6">{label}</span>
			</label>
			<Textarea
				className={`${
					isError &&
					'border-destructive/80 text-destructive focus-visible:border-destructive'
				} ${className}`}
				placeholder=""
				{...props}
			/>
		</div>
	);
}
