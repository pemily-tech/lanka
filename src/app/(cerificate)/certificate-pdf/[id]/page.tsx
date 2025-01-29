import CertificatePdf from './ui/pdf';
import Print from './ui/print';

const Page = () => {
	return (
		<div className="pb-[100px]">
			<div className="text-18 text-purple decoration-purple my-6 text-center font-bold underline">
				PREVIEW
			</div>
			<div className="text-14 text-purple mb-10 text-center font-medium">
				<span className="font-bold">NOTE: </span>VERIFY DOB AND AGE
				BEFORE PRINTING. UPDATE IN PET PROFILE IF INCORRECT, THEN
				RECREATE CERTIFICATE.
			</div>
			<CertificatePdf />
			<Print />
		</div>
	);
};

export default Page;
