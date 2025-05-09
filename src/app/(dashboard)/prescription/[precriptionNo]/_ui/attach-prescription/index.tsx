'use client';

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '../../../../../../ui/shared/tabs';
import UploadCard from './upload-card';

export default function AttachPrescription() {
	return (
		<div className="pr-16">
			<h3 className="font-semibold">Attach Documents</h3>
			<Tabs defaultValue="prescription" className="w-full">
				<TabsList className="w-full justify-start rounded-none border-b bg-white">
					<TabsTrigger className="flex-1 py-12" value="prescription">
						Prescription
					</TabsTrigger>
					<TabsTrigger className="flex-1 py-12" value="followup">
						Follow up
					</TabsTrigger>
					<TabsTrigger className="flex-1 py-12" value="report">
						Report
					</TabsTrigger>
				</TabsList>
				<TabsContent value="prescription">
					<UploadCard type="PRESCRIPTION" />
				</TabsContent>
				<TabsContent value="followup">
					<UploadCard type="FOLLOWUP" />
				</TabsContent>
				<TabsContent value="report">
					<UploadCard type="REPORT" />
				</TabsContent>
			</Tabs>
		</div>
	);
}
