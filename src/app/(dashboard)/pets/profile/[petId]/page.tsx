import PetDetails from './_ui/pet-details';
import RecordTabs from './_ui/record-tabs';

export default function Page() {
	return (
		<div className="shadow-card flex flex-col gap-8 rounded-[16px] bg-white p-4">
			<PetDetails />
			<RecordTabs />
		</div>
	);
}
