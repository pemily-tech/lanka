'use client';

import Columns from './ui/columns';
import Header from './ui/header';
import { ProductListing } from './ui/listing';

export default function Page() {
	return (
		<ProductListing activeType="ACTIVE" apiKey="item/list">
			<Header />
			<Columns />
		</ProductListing>
	);
}
