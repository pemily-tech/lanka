import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '@/helpers/utils';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'rounded-12 border-grey-light text-14 text-black-2 shadow-1 shadow-black-1 ring-offset-background focus-visible:border-primary flex h-48 w-full border bg-white px-14 py-12 transition-shadow focus-visible:border-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
					type === 'search' &&
						'[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none',
					type === 'file' &&
						'text-muted-foreground/70 file:border-input file:text-12 file:text-foreground p-0 pr-3 file:me-12 file:h-full file:border-0 file:border-r file:border-solid file:bg-transparent file:px-12 file:font-medium file:not-italic',
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);

export default Input;
