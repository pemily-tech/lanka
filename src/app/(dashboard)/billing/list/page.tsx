'use client';

import Columns from './ui/columns';
import Header from './ui/header';
import { InvoiceListing } from './ui/listing';

export default function Page() {
	return (
		<InvoiceListing activeType="ACTIVE" apiKey="invoice/list">
			<Header />
			<Columns />
		</InvoiceListing>
	);
}
