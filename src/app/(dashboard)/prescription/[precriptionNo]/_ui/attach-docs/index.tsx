'use client';

import { useState } from 'react';

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '../../../../../../ui/shared/tabs';
import DocsList from './list';
import UploadCard from './upload-card';

export default function AttachDocs() {
	const [value, setValue] = useState('PRESCRIPTION');

	return (
		<div className="pr-16">
			<h3 className="font-semibold">Attach Documents</h3>
			<Tabs
				value={value}
				onValueChange={setValue}
				defaultValue="PRESCRIPTION"
				className="w-full"
			>
				<TabsList className="w-full justify-start rounded-none border-b bg-white">
					<TabsTrigger className="flex-1 py-12" value="PRESCRIPTION">
						Prescription
					</TabsTrigger>
					<TabsTrigger className="flex-1 py-12" value="FOLLOWUP">
						Follow up
					</TabsTrigger>
					<TabsTrigger className="flex-1 py-12" value="REPORT">
						Report
					</TabsTrigger>
				</TabsList>
				<TabsContent value="PRESCRIPTION">
					<div className="flex flex-col">
						<UploadCard type="PRESCRIPTION" />
						<DocsList type="PRESCRIPTION" />
					</div>
				</TabsContent>
				<TabsContent value="FOLLOWUP">
					<div className="flex flex-col">
						<UploadCard type="FOLLOWUP" />
						<DocsList type="FOLLOWUP" />
					</div>
				</TabsContent>
				<TabsContent value="REPORT">
					<div className="flex flex-col">
						<UploadCard type="REPORT" />
						<DocsList type="REPORT" />
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
