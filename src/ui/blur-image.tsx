'use client';

import { useEffect, useRef, useState } from 'react';

type BlurImageProps = {
	url: string;
	width?: number;
	height?: number;
	quality?: number;
	className?: string;
	alt?: string;
};

export function BlurImage({
	url,
	width = 760,
	height = 760,
	quality = 80,
	className = '',
	alt = 'Image',
}: BlurImageProps) {
	const [isInView, setIsInView] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const encodedUrl = encodeURIComponent(url);
	const fullSrc = `/api/image?url=${encodedUrl}&w=${width}&h=${height}&q=${quality}`;
	const blurSrc = `/api/image?url=${encodedUrl}&w=15&h=15&q=20&blur=true`;

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

		if (wrapperRef.current) {
			observer.observe(wrapperRef.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={wrapperRef}
			className={`relative w-full overflow-hidden ${className}`}
		>
			<div
				className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
					loaded ? 'opacity-0' : 'opacity-100'
				}`}
				style={{ backgroundImage: `url(${blurSrc})` }}
			/>
			{isInView && (
				<img
					src={fullSrc}
					alt={alt}
					onLoad={() => setLoaded(true)}
					className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
						loaded ? 'opacity-100' : 'opacity-0'
					}`}
				/>
			)}
		</div>
	);
}
