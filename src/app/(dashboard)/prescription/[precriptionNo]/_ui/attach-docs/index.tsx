'use client';

import { useState } from 'react';

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '../../../../../../ui/tabs';
import DocsList from './list';
import UploadCard from './upload-card';

export default function AttachDocs() {
	const [value, setValue] = useState('PRESCRIPTION');

	return (
		<div className="pr-4">
			<h3 className="font-semibold">Attach Documents</h3>
			<Tabs
				value={value}
				onValueChange={setValue}
				defaultValue="PRESCRIPTION"
				className="w-full"
			>
				<TabsList className="w-full justify-start rounded-none border-b bg-white">
					<TabsTrigger className="flex-1 py-3" value="PRESCRIPTION">
						Prescription
					</TabsTrigger>
					<TabsTrigger className="flex-1 py-3" value="REPORT">
						Report
					</TabsTrigger>
					<TabsTrigger className="flex-1 py-3" value="OTHER">
						Other
					</TabsTrigger>
				</TabsList>
				<TabsContent className="mt-0" value="PRESCRIPTION">
					<div className="flex flex-col gap-3">
						<DocsList type="PRESCRIPTION" />
						<UploadCard type="PRESCRIPTION" />
					</div>
				</TabsContent>
				<TabsContent className="mt-0" value="REPORT">
					<div className="flex flex-col gap-3">
						<DocsList type="REPORT" />
						<UploadCard type="REPORT" />
					</div>
				</TabsContent>
				<TabsContent className="mt-0" value="OTHER">
					<div className="flex flex-col gap-3">
						<DocsList type="OTHER" />
						<UploadCard type="OTHER" />
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
