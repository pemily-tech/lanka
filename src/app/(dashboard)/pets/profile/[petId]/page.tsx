import PetDetails from './_ui/pet-details';
import RecordTabs from './_ui/record-tabs';

export default function Page() {
	return (
		<div className="flex flex-col gap-8 rounded-[16px] bg-white p-4 shadow-md">
			<PetDetails />
			<RecordTabs />
		</div>
	);
}
