'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/helpers/utils';

export const Tabs = TabsPrimitive.Root;

export const TabsList = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.List
		ref={ref}
		className={cn(
			'bg-muted text-muted-foreground inline-flex items-center justify-center rounded-lg',
			className
		)}
		{...props}
	/>
));
TabsList.displayName = TabsPrimitive.List.displayName;

export const TabsTrigger = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Trigger
		ref={ref}
		className={cn(
			'ring-offset-background focus-visible:ring-ring border-primary data-[state=active]:text-primary inline-flex items-center justify-center whitespace-nowrap px-24 py-8 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-2 data-[state=active]:font-semibold',
			className
		)}
		{...props}
	/>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export const TabsContent = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Content
		ref={ref}
		className={cn(
			'ring-offset-background focus-visible:ring-ring mt-16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
			className
		)}
		{...props}
	/>
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
