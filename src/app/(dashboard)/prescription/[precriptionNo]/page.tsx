import AdviceFollowup from './_ui/advice-followup';
import BasicDetails from './_ui/basic-details';
import Footer from './_ui/footer';
import Medicines from './_ui/medicines';
import Soap from './_ui/soap';
import Vitals from './_ui/vitals';

export default function Page() {
	return (
		<div className="shadow-card1 rounded-lg bg-white p-16">
			<BasicDetails />
			<div className="grid grid-cols-6">
				<div className="col-span-2">
					<Soap />
				</div>
				<div className="col-span-4 border-l ">
					<Vitals />
					<Medicines />
					<AdviceFollowup />
					<Footer />
				</div>
			</div>
		</div>
	);
}
