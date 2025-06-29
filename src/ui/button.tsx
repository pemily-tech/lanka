import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { cn } from '@/helpers/utils';

export const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive cursor-pointer",
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
				destructive:
					'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20',
				outline:
					'border border-border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
				secondary:
					'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-12 px-3 rounded-xl',
				sm: 'h-8 rounded-xl px-1',
				lg: 'h-14 rounded-xl px-3',
				icon: 'h-8 w-8',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

export type IButtonVariants = VariantProps<typeof buttonVariants>;

export function Button({
	className,
	variant,
	size,
	asChild = false,
	loading = false,
	loadingText = '',
	children,
	...props
}: React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
		loading?: boolean;
		loadingText?: string;
		children: React.ReactNode;
	}) {
	const Comp = asChild ? Slot : 'button';

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		>
			{loading ? (
				<div className="flex items-center gap-2">
					<Loader2 className="animate-spin" />
					<span className="text-sm font-medium">{loadingText}</span>
				</div>
			) : (
				children
			)}
		</Comp>
	);
}
