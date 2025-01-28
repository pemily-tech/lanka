import localFont from 'next/font/local';

const satoshi = localFont({
	src: [
		{
			path: '../../assets/fonts/Satoshi-Light.otf',
			weight: '300',
			style: 'normal',
		},
		{
			path: '../../assets/fonts/Satoshi-Regular.otf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../assets/fonts/Satoshi-Medium.otf',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../../assets/fonts/Satoshi-Bold.otf',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../../assets/fonts/Satoshi-Black.otf',
			weight: '700',
			style: 'normal',
		},
	],
	variable: '--font-satoshi',
	display: 'swap',
	preload: true,
});

export const fonts = [satoshi.variable];
