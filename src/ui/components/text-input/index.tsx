'use client';

import React from 'react';
import { type FieldError } from 'react-hook-form';

interface TextInputProps {
	label: string;
	name: string;
	type?:
		| 'numeric'
		| 'email'
		| 'search'
		| 'text'
		| 'tel'
		| 'url'
		| 'none'
		| 'decimal';
	inputClasses?: string;
	placeholder?: string;
	disabled?: boolean;
	error?: FieldError;
	readonly?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	maxLength?: number;
	minLength?: number;
	rest?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
	(
		{
			label,
			type = 'text',
			name,
			inputClasses,
			placeholder = '',
			disabled = false,
			error,
			readonly = false,
			onChange,
			maxLength,
			minLength,
			...rest
		},
		ref
	) => {
		const hasErrorInput = error
			? 'border-red-1 focus:ring-red-1'
			: 'focus:ring-brand border-grey-divider';
		const hasErrorLabel = error ? 'text-red-1' : 'text-grey-text2';

		return (
			<div className="relative">
				{label !== '' && (
					<label
						className={`text-14 leading-14 mb-[10px] block cursor-pointer ${hasErrorLabel}`}
					>
						{label}
					</label>
				)}
				<div className="relative">
					<input
						{...rest}
						ref={ref}
						name={name}
						className={`text-14 leading-16 rounded-8 h-[52px] w-full border bg-white px-12 outline-none transition  duration-300 ease-in-out focus:border-none
   focus:shadow-sm focus:outline-none focus:ring-1 focus:ring-opacity-90 ${hasErrorInput} ${inputClasses}`}
						type={type}
						placeholder={placeholder}
						disabled={disabled}
						readOnly={readonly}
						onChange={onChange}
						{...(maxLength ? { maxLength } : {})}
						{...(minLength ? { minLength } : {})}
					/>
				</div>
				{error && (
					<p className={`text-12 ${hasErrorLabel}`}>
						{error.message}
					</p>
				)}
			</div>
		);
	}
);

export default TextInput;
