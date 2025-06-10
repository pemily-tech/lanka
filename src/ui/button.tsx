import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { cn } from '@/helpers/utils';

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground shadow hover:bg-primary/90 font-bold',
				destructive:
					'bg-destructive text-destructive-foreground shadow-md hover:bg-red-1/90 font-bold',
				outline:
					'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground font-bold',
				secondary:
					'bg-secondary text-white shadow-sm hover:bg-secondary/80 font-bold',
				ghost: 'hover:bg-accent hover:text-accent-foreground font-medium',
				link: 'text-brand underline-offset-4 hover:underline font-bold',
			},
			size: {
				default: 'h-12 px-3',
				sm: 'h-8 rounded-xl px-1',
				lg: 'h-14 rounded-xl px-3',
				icon: 'h-6 w-6',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	loading?: boolean;
	loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			asChild = false,
			loading = false,
			loadingText = 'Submitting...',
			...props
		},
		ref
	) => {
		const Comp = asChild ? Slot : 'button';

		return (
			<Comp
				className={cn(
					buttonVariants({ variant, size, className }),
					loading && 'cursor-not-allowed opacity-60',
					'cursor-pointer'
				)}
				ref={ref}
				disabled={loading || props.disabled}
				{...props}
			>
				{loading ? (
					<div className="flex items-center gap-2">
						<Loader2 className="animate-spin" />
						<span className="text-sm font-medium">
							{loadingText}
						</span>
					</div>
				) : (
					props.children
				)}
			</Comp>
		);
	}
);
Button.displayName = 'DefaultButton';

export { Button, buttonVariants };
