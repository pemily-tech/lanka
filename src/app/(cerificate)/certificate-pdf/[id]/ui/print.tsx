/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import useDownloadDocument from '../../../../../api/use-download-document/download-document';
import usePetCertificateVaccination from '../../../../../api/use-pet-certificate-vaccination/use-pet-certificate-vaccination';
import useUploadMedicalRecord from '../../../../../api/use-upload-medical-record/upload-medical-record';
import useRouterQuery from '../../../../../hooks/use-router-query';
import { type IMedicalRecord } from '../../../../../types/clinic';
import { type IApiResponse } from '../../../../../types/common';
import useCertificate from '../../../../../ui/components/health-certificate/hooks/use-certificate';
import { ImagePlaceholder } from '../../../../../ui/shared/image';
import Loading from '../../../../loading';

export default function Print() {
	const { query, params, back } = useRouterQuery();
	const petId = query?.id as string;
	const heading = params.get('type');
	const {
		mutateAsync: downloadDocument,
		isPending: getMedicalRecordPdfPending,
	} = useDownloadDocument();
	const { refetch } = useCertificate({
		activeFilter: heading as string,
		petId,
	});

	const { data } = usePetCertificateVaccination({
		type: heading as string,
		petId,
	});
	const { petAndParentDetail, clinicData } =
		data?.data?.certificateData || {};
	const parentDetails = petAndParentDetail?.parent;
	const {
		mutateAsync: uploadMedicalRecord,
		isPending: uploadMedicalRecordPending,
	} = useUploadMedicalRecord({
		petId: petId as string,
	});
	const disableButton =
		getMedicalRecordPdfPending || uploadMedicalRecordPending;

	const handlePdf = async () => {
		if (disableButton) return;
		try {
			const htmltopdf = await require('html2pdf.js');
			const opt = {
				filename: 'certificate.pdf',
				image: { type: 'jpeg', quality: 1 },
				pagebreak: {
					avoid: 'tr',
					mode: 'css',
					before: '#page-break',
					after: '1cm',
				},
				html2canvas: {
					scale: 2,
					useCORS: true,
					letterRendering: true,
					dpi: 300,
				},
				jsPDF: {
					unit: 'px',
					format: 'a4',
					orientation: 'portrait',
					putTotalPages: true,
					hotfixes: ['px_scaling'],
				},
			};
			const element = document.querySelector('#pdf');
			htmltopdf()
				.from(element)
				.set(opt)
				.toPdf()
				.output('blob')
				.then(async (pdfBlob: any) => {
					const pdfWithType: any = new Blob([pdfBlob], {
						type: 'application/pdf',
					});
					const formData = new FormData();
					formData.append('file', pdfWithType, `${heading}.pdf`);
					formData.append('type', heading as string);
					formData.append(
						'parentId',
						parentDetails?.parentId as string
					);
					formData.append('clinicId', clinicData?.userId as string);
					try {
						const response: any = (await uploadMedicalRecord(
							formData
						)) as IApiResponse<IMedicalRecord>;
						const payload = {
							key: response?.data?.medicalRecord?.url as string,
						};
						const resp = await downloadDocument(payload);
						back();
						refetch();
						window.open(resp?.data?.signedUrl, '_blank');
					} catch (err) {
						console.error('Error:', err);
					}
				})
				.catch((err: any) => {
					console.error('Error in htmltopdf:', err);
				});
		} catch (err) {
			console.error('Error generating PDF:', err);
		} finally {
			/* empty */
		}
	};

	return (
		<div className="right-50 bottom-50 fixed flex cursor-pointer flex-col items-center gap-4">
			<button
				className={`relative flex size-[52px] items-center justify-center rounded-full border border-gray-300 bg-white shadow-lg ${disableButton && 'cursor-not-allowed opacity-50'}`}
				onClick={handlePdf}
				disabled={disableButton}
			>
				{disableButton ? (
					<div className="absolute inset-0 flex items-center justify-center">
						<Loading />
					</div>
				) : (
					<>
						<span className="absolute inline-flex size-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
						<ImagePlaceholder
							src="/images/print.svg"
							containerClasses="w-[32px] h-[32px]"
						/>
					</>
				)}
			</button>
			<span className="text-14 text-primary text-center font-bold">
				{disableButton ? 'Saving...' : 'Click to Save/Print'}
			</span>
		</div>
	);
}
