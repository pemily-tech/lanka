'use client';

import dynamic from 'next/dynamic';
import {
	useParams,
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation';

import { useGetPetById } from '@/api/queries/use-get-pet-byid';
import { type IPetItem } from '@/types/common';
import Spinner from '@/ui/spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';

const MedicalRecord = dynamic(() => import('../_ui/medical-record'), {
	loading: () => <Spinner />,
	ssr: false,
});

const FollowUps = dynamic(() => import('./follow-up'), {
	loading: () => <Spinner />,
	ssr: false,
});

const VaccinationRecord = dynamic(() => import('./vaccination-records'), {
	loading: () => <Spinner />,
	ssr: false,
});

export default function RecordTabs() {
	const router = useRouter();
	const params = useParams();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const type = searchParams.get('type') as string;
	const { data } = useGetPetById(params?.petId as string);
	const petData = data?.data?.pet || ({} as IPetItem);

	const handleChange = (val: string) => {
		router.replace(`${pathname}?type=${val}&parentId=${petData.parentId}`);
	};

	const tabData = [
		{
			label: 'Medical Records',
			value: 'medical',
			component: <MedicalRecord />,
		},
		{
			label: 'Vaccination Records',
			value: 'vaccination',
			component: <VaccinationRecord />,
		},
		{
			label: 'Follow Ups',
			value: 'followups',
			component: <FollowUps />,
		},
		{
			label: 'Health Certificate',
			value: 'health_certificate',
			component: <div>Health Certificate</div>,
		},
	];

	return (
		<div className="w-full">
			<Tabs value={type} onValueChange={handleChange}>
				<TabsList className="mb-3 w-full max-w-3xl justify-start rounded-none border-b bg-white">
					{tabData.map((tab) => (
						<TabsTrigger
							key={tab.value}
							className="flex-1 py-3"
							value={tab.value}
						>
							{tab.label}
						</TabsTrigger>
					))}
				</TabsList>
				{tabData.map((tab) => (
					<TabsContent
						key={tab.value}
						className="mt-0"
						value={tab.value}
					>
						{tab.component}
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
}
