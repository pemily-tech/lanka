import MedicalRecordForm from '@/components/medical-records/form';
import { type IMedicalRecordFilter } from '@/types/common';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/ui/dialog';

export default function MedicalRecordDialog({
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
	filter?: IMedicalRecordFilter;
}) {
	return (
		<Dialog open={show} onOpenChange={setShow}>
			<DialogContent className="max-w-3xl">
				<DialogHeader>
					<DialogTitle></DialogTitle>
				</DialogHeader>
				<DialogDescription />
				<MedicalRecordForm
					parentId={parentId}
					petId={petId}
					filterType={filter as IMedicalRecordFilter}
					isModal={true}
					onFinish={() => setShow(false)}
				/>
			</DialogContent>
		</Dialog>
	);
}
