import { TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import Followup from '../../../../../ui/components/followup/followup';
import TabItem from './tab';

export default function PetTabs() {
	return (
		<div className="col-span-3 rounded-[16px] bg-white px-16 py-32">
			<TabGroup className="flex-1 overflow-hidden px-16">
				<TabList className="flex items-center justify-between">
					<div className="flex gap-32">
						<TabItem title="Medical Records" />
						<TabItem title="Vaccination Records" />
						<TabItem title="Follow Ups" />
						<TabItem title="Health Certificate" />
					</div>
				</TabList>
				<TabPanels className="mt-6">
					<TabPanel>{/* <MedicalRecord /> */}</TabPanel>
					<TabPanel>{/* <Vaccination /> */}</TabPanel>
					<TabPanel>
						<Followup />
					</TabPanel>
					<TabPanel>{/* <HealthCertificate /> */}</TabPanel>
				</TabPanels>
			</TabGroup>
		</div>
	);
}
