import { forwardRef, type TextareaHTMLAttributes } from 'react';

import { cn } from '../../../helpers/utils';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, ...props }, ref) => {
		return (
			<textarea
				className={cn(
					'rounded-12 border-grey-light text-16 text-black-2 shadow-1 shadow-black-1 ring-offset-background focus-visible:border-primary flex min-h-[80px] w-full border bg-white px-14 py-12 transition-shadow focus-visible:border-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
