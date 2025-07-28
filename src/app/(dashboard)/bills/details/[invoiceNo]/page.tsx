import { BilledBy } from '../_ui/billed-by';
import { Header } from '../_ui/header';
import Items from '../_ui/items';

export default function Page() {
	return (
		<div className="grid grid-cols-5 gap-6">
			<div className="col-span-3 flex flex-col gap-6">
				<Header />
				<Items />
			</div>
			<div className="col-span-2">
				<BilledBy />
			</div>
		</div>
	);
}
