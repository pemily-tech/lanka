import AdviceFollowup from './_ui/advice-followup';
import AttachDocs from './_ui/attach-docs';
import BasicDetails from './_ui/basic-details';
import Footer from './_ui/footer';
import Medicines from './_ui/medicines';
import Signature from './_ui/signature';
import Soap from './_ui/soap';
import Vitals from './_ui/vitals';

export default async function Page() {
	return (
		<div className="shadow-card1 rounded-lg bg-white p-16">
			<BasicDetails />
			<div className="grid grid-cols-6">
				<div className="col-span-2">
					<Soap />
					<AttachDocs />
				</div>
				<div className="col-span-4 border-l ">
					<Vitals />
					<Medicines />
					<AdviceFollowup />
					<Signature />
					<Footer />
				</div>
			</div>
		</div>
	);
}
