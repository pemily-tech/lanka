import { PencilLine } from 'lucide-react';

import { Button } from '../../../../../ui/shared';

export default function Medicines() {
	return (
		<div className="border-l px-16 pt-16">
			<div className="flex flex-row items-center gap-8">
				<h4 className="text-16 text-primary font-semibold">
					Medicine (RX)
				</h4>
				<Button className="" size="icon" variant="ghost">
					<PencilLine className="text-primary size-16" />
				</Button>
			</div>
		</div>
	);
}
