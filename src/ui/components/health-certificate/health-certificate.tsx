// 'use client';

// import { useEffect, useState } from 'react';
// import Select, { type SingleValue } from 'react-select';
// import Link from 'next/link';

// import { certificateData } from '../../../helpers/constant';
// import { customSelectBoxStyles } from '../../../helpers/utils';
// import useRouterQuery from '../../../hooks/use-router-query';
// import Certificate from './components/records';
// import useCertificate from './hooks/use-certificate';

// interface OptionType {
// 	value: string;
// 	label: string;
// }

// export function HealthCertificate() {
// 	const [selectedRecord, setRecord] = useState<SingleValue<OptionType>>(
// 		certificateData?.[0]
// 	);
// 	const { query } = useRouterQuery();
// 	const petId = query?.id as string;

// 	const { refetch } = useCertificate({
// 		activeFilter: selectedRecord?.value as string,
// 		petId,
// 	});

// 	useEffect(() => {
// 		refetch();
// 	}, []);

// 	const handleChange = (option: SingleValue<OptionType>) => {
// 		setRecord(option);
// 	};

// 	return (
// 		<div>
// 			<div className="my-12 flex items-center justify-between">
// 				<div className="min-w-[320px]">
// 					<label className="text-14 leading-24">
// 						Choose a certificate
// 					</label>
// 					<Select
// 						options={certificateData}
// 						className="react-select-container h-[52px]"
// 						classNamePrefix="react-select"
// 						styles={customSelectBoxStyles}
// 						onChange={handleChange}
// 						value={selectedRecord}
// 					/>
// 				</div>
// 				<Link
// 					className="bg-primary rounded-8 px-16 py-12"
// 					href={`/certificate-pdf/${petId}?type=${selectedRecord?.value}`}
// 				>
// 					<span className="text-14 font-bold text-white">
// 						Create {selectedRecord?.label}
// 					</span>
// 				</Link>
// 			</div>
// 			<Certificate
// 				activeFilter={selectedRecord?.value as string}
// 				petId={petId}
// 			/>
// 		</div>
// 	);
// }

// export default HealthCertificate;
