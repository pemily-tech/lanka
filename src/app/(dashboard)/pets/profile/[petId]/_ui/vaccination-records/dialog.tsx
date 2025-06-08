import VaccinationForm from '@/app/(dashboard)/vaccination-records/_ui/form';
import { type IOtherCommonFilter } from '@/types/common';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/ui/dialog';

export default function VaccinationDialog({
	show,
	setShow,
	parentId,
	petId,
	filter,
}: {
	show: boolean;
	setShow: (show: boolean) => void;
	parentId: string;
	petId: string;
	filter?: IOtherCommonFilter;
}) {
	return (
		<Dialog open={show} onOpenChange={setShow}>
			<DialogContent className="max-w-3xl">
				<DialogHeader>
					<DialogTitle></DialogTitle>
				</DialogHeader>
				<DialogDescription />
				<VaccinationForm
					parentId={parentId}
					petId={petId}
					isModal={true}
					onFinish={() => setShow(false)}
					filterType={filter}
				/>
			</DialogContent>
		</Dialog>
	);
}
