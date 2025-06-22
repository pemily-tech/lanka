import BasicDetails from './_ui/basic-details';
import Footer from './_ui/footer';
import Header from './_ui/header';
import Templates from './_ui/templates';

export default function Page() {
	return (
		<div>
			<Header />
			<div className="rounded-lg bg-white p-4 shadow-md">
				<BasicDetails />
				<Templates />
				<Footer />
			</div>
		</div>
	);
}
