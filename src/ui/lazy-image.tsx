/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react';

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

	return (
		<img
			ref={ref}
			src={isVisible ? src : '/images/placeholder.png'}
			alt={alt}
			className={className}
		/>
	);
}
