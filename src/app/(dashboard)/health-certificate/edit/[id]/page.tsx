import BasicDetails from './_ui/basic-details';
import Header from './_ui/header';

export default function Page() {
	return (
		<div>
			<Header />
			<div className="rounded-lg bg-white p-4 shadow-md">
				<BasicDetails />
			</div>
		</div>
	);
}
