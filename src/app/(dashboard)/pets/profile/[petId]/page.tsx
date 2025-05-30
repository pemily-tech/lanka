import PetDetails from './_ui/pet-details';
import RecordTabs from './_ui/record-tabs';

export default function Page() {
	return (
		<div className="shadow-card1 flex flex-col gap-32 rounded-[16px] bg-white p-16">
			<PetDetails />
			<RecordTabs />
		</div>
	);
}
