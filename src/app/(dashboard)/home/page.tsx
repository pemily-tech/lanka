import { BgImage } from './_ui/bg-image';
import { HomeForm } from './_ui/form';

import { env } from '@/env.mjs';
import { type IHomeInfoCard } from '@/types/common';

const Page = async () => {
	const response = await fetch(`${env.APP_URL}/api/home/text-data`);
	const { data }: { data: IHomeInfoCard[] } = await response.json();

	return (
		<section className="rounded-lg bg-white shadow-card p-6">
			<div className="grid grid-cols-5">
				<div className="col-span-2 p-4">
					<h1 className="text-3xl font-semibold">
						Data For Your Growth & Trust
					</h1>
					<ul className="space-y-2 py-4 pl-1">
						{data &&
							data?.map((list, i) => (
								<li
									key={i}
									className="relative list-none py-1 pl-2"
								>
									<span className="text-lg font-semibold text-gray-700">
										{list?.l1}:{' '}
									</span>
									<span className="text-black">
										{list?.l2}
									</span>
								</li>
							))}
					</ul>
					<HomeForm />
				</div>
				<div className="col-span-3 p-6">
					<BgImage />
				</div>
			</div>
		</section>
	);
};

export default Page;
