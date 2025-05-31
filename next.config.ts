import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		domains: [
			'pemilyy-assets.s3.ap-south-1.amazonaws.com',
			'pemily-prod-docs.s3.ap-south-1.amazonaws.com',
			'pemily-test-docs.s3.ap-south-1.amazonaws.com',
		],
	},
	reactStrictMode: false,
};

export default nextConfig;
