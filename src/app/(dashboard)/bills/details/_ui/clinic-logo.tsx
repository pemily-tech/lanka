import { useGetClinicLogo } from '@/api/queries/use-get-clinic-logo';
import { BlurImage } from '@/ui/blur-image';

export function ClinicLogo() {
	const { data: logoData } = useGetClinicLogo();
	const clinicLogo = logoData?.data?.logoUrl;

	return (
		<div className="border-secondary size-[142px] rounded-full border-2 p-4">
			{clinicLogo && (
				<BlurImage
					src={clinicLogo}
					className="size-full"
					width={240}
					height={240}
					imageClasses="rounded-full object-cover"
				/>
			)}
		</div>
	);
}
