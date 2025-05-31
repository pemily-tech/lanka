import React from 'react';
import Link from 'next/link';

import { Button } from '../ui/button';
import { ImagePlaceholder } from '../ui/image';

const PageNotFound = () => {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center space-y-16 bg-white py-20 text-center">
			<ImagePlaceholder
				containerClasses="w-[400px] h-[400px]"
				src="/images/404.svg"
			/>
			<div className="mx-auto w-full max-w-[546px]">
				<h4 className="text-32 mb-12 font-semibold">Page not found</h4>
				<p className="mb-10">
					The page you are looking for might have been removed had its
					name changed or is temporarily unavailable.
				</p>
			</div>
			<Link href="/">
				<Button>Go to homepage</Button>
			</Link>
		</div>
	);
};

export default PageNotFound;
