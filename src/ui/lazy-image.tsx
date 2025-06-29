'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/helpers/utils';

interface IProps {
	src: string;
	alt?: string;
	className?: string;
}

export function LazyImage({ src, alt = 'pemilyy', className }: IProps) {
	const ref = useRef<HTMLImageElement | null>(null);
	const [isVisible, setVisible] = useState(false);

	useEffect(() => {
		if (!ref.current) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.disconnect();
				}
			},
			{
				threshold: 0.1,
			}
		);

		observer.observe(ref.current);

		return () => {
			observer.disconnect();
		};
	}, []);

	if (!isVisible) {
		return (
			<img
				ref={ref}
				src="/images/placeholder.png"
				alt="Pemilyy"
				className={cn(className, '!object-contain')}
			/>
		);
	}

	return <img ref={ref} src={src} alt={alt} className={className} />;
}
