'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/helpers/utils';

type BlurImageProps = {
	src: string;
	source?: 'local' | 'remote';
	width?: number;
	height?: number;
	quality?: number;
	className?: string;
	imageClasses?: string;
	alt?: string;
};

export function BlurImage({
	src,
	source = 'remote',
	width = 760,
	height = 760,
	quality = 80,
	className = '',
	alt = 'Pemilyy',
	imageClasses = '',
}: BlurImageProps) {
	const [isInView, setIsInView] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const encoded = encodeURIComponent(src);
	const baseParams = `source=${source}&w=${width}&h=${height}&q=${quality}`;
	const fullSrc =
		source === 'local'
			? `/api/image?${baseParams}&path=${encoded}`
			: `/api/image?${baseParams}&url=${encoded}`;

	const blurSrc =
		source === 'local'
			? `/api/image?source=${source}&w=16&h=16&q=20&blur=true&path=${encoded}`
			: `/api/image?source=${source}&w=16&h=16&q=20&blur=true&url=${encoded}`;

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setIsInView(true);
					observer.disconnect();
				}
			},
			{ rootMargin: '100px' }
		);

		if (wrapperRef.current) observer.observe(wrapperRef.current);

		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={wrapperRef}
			className={`relative overflow-hidden ${className}`}
		>
			<div
				className={cn(
					'absolute inset-0 bg-cover bg-center transition-opacity duration-500',
					loaded ? 'opacity-0' : 'opacity-100'
				)}
				style={{ backgroundImage: `url(${blurSrc})` }}
			/>
			{isInView && (
				<img
					src={fullSrc}
					alt={alt}
					onLoad={() => setLoaded(true)}
					className={cn(
						'absolute inset-0 w-full h-full object-cover transition-opacity duration-500',
						loaded ? 'opacity-100' : 'opacity-0',
						imageClasses
					)}
				/>
			)}
		</div>
	);
}
