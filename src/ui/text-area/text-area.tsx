import { forwardRef, type TextareaHTMLAttributes } from 'react';

import { cn } from '@/helpers/utils';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, ...props }, ref) => {
		return (
			<textarea
				className={cn(
					'ring-offset-background focus-visible:border-primary flex min-h-[80px] w-full rounded-xl border border-border bg-white p-3 text-sm text-black transition-shadow focus-visible:border-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
