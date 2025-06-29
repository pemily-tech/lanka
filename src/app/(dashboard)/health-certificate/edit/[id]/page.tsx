import BasicDetails from './_ui/basic-details';
import Footer from './_ui/footer';
import Header from './_ui/header';
import TemplateDetails from './_ui/template-details';
import Templates from './_ui/templates';
import Vaccines from './_ui/vaccines';

export default function Page() {
	return (
		<div>
			<Header />
			<div className="rounded-lg bg-white p-4 shadow-md">
				<BasicDetails />
				<TemplateDetails />
				<Vaccines />
				<Templates />
				<Footer />
			</div>
		</div>
	);
}
