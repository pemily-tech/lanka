import Spinner from '@/ui/shared/spinner';

const Loading = () => {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center">
			<Spinner />
		</div>
	);
};

export default Loading;
