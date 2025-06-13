import { ParentForm } from '../../_ui/form';
import ImageUpload from '../_ui/image-upload';

export default function Page() {
	return (
		<div>
			<div className="heading mb-4">Edit Parent Details</div>
			<div className="grid grid-cols-3 gap-6">
				<div className="col-span-2">
					<ParentForm type="edit" />
				</div>
				<div className="col-span-1">
					<ImageUpload />
				</div>
			</div>
		</div>
	);
}
