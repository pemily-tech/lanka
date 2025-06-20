'use client';

import { BlurImage } from '@/ui/blur-image';

export function BgImage() {
	return (
		<BlurImage
			className="size-full"
			src="/images/home-bg.webp"
			width={1534}
			height={1024}
			source="local"
		/>
	);
}
