import AdviceFollowup from './_ui/advice-followup';
import AttachDocs from './_ui/attach-docs';
import BasicDetails from './_ui/basic-details';
import Footer from './_ui/footer';
import Header from './_ui/header';
import Medicines from './_ui/medicines';
import Signature from './_ui/signature';
import Soap from './_ui/soap';
import Vitals from './_ui/vitals';

export default async function Page() {
	return (
		<div>
			<Header />
			<div className="rounded-lg bg-white p-4 shadow-md">
				<BasicDetails />
				<div className="grid grid-cols-6">
					<div className="col-span-2">
						<Soap />
						<AttachDocs />
					</div>
					<div className="col-span-4 border-l border-border">
						<Vitals />
						<Medicines />
						<AdviceFollowup />
						<Signature />
						<Footer />
					</div>
				</div>
			</div>
		</div>
	);
}
