import dynamic from 'next/dynamic';

import Loader from '../../public/lottie/only-desktop.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const MobileOnly = () => {
	return (
		<div className="flex flex-col gap-6 p-4 h-screen items-center justify-center">
			<Lottie
				style={{ height: 180, width: '100%' }}
				animationData={Loader}
			/>
			<p className="font-semibold text-center px-4">
				Currently we support dashboard only in desktop mode.
			</p>
		</div>
	);
};

export default MobileOnly;
