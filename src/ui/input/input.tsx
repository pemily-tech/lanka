import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '@/helpers/utils';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'ring-offset-background focus-visible:border-primary shadow-xs flex h-12 w-full rounded-xl border border-gray-300 bg-white p-3 text-sm transition-shadow focus-visible:border-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
					type === 'search' &&
						'[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none',
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);

export default Input;
