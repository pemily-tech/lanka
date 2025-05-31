import { ChevronDown } from 'lucide-react';

import useGetDoctors from '../../../_api/use-get-doctors';
import DoctorForm from './form';
import ProfileImage from './profile-image';
import Signature from './signature';

import { type IClinicDoctor } from '@/types/clinic';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/ui/collapsible';
import Spinner from '@/ui/spinner';

export default function Doctors() {
	const { data, isPending } = useGetDoctors();
	const doctorsData = data?.data?.doctors || ([] as IClinicDoctor[]);

	if (isPending) {
		return <Spinner />;
	}

	return (
		<div className="max-w-3xl space-y-16">
			{doctorsData.map((doctor) => (
				<Collapsible key={doctor._id} className="group">
					<div className="rounded-lg border transition-all group-data-[state=open]:shadow-sm">
						<CollapsibleTrigger className="flex w-full items-center justify-between px-16 py-12 text-left font-medium">
							<div className="flex items-center gap-12">
								<ProfileImage id={doctor?.doctor?.doctorId} />
								<div className="flex flex-col gap-4">
									<span className="text-sm">
										{doctor.doctor?.name}
									</span>
									<span className="text-sm">
										{doctor.doctor?.mobile}
									</span>
								</div>
							</div>
							<div className="transition-transform duration-200 group-data-[state=open]:rotate-180">
								<ChevronDown className="size-16" />
							</div>
						</CollapsibleTrigger>
						<CollapsibleContent className="text-muted-foreground px-16 py-12 text-sm">
							<Signature doctor={doctor.doctor} />
							<DoctorForm doctor={doctor.doctor} />
						</CollapsibleContent>
					</div>
				</Collapsible>
			))}
		</div>
	);
}
