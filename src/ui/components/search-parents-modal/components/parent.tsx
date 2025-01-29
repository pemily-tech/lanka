import { memo } from 'react';

import EnterIcon from '../../../icons/enter-icon';
import { RadioFilledIcon } from '../../../icons/radio-filled-icon';
import { RadioUnfilledIcon } from '../../../icons/radio-unfilled-icon';
import Pets from './pets';

function Parent({
	data,
	handleParent,
	activeParent,
	focusedIndex,
	activeClinic,
}: {
	data: IClinicTypes.IPetParent[];
	handleParent: (e: React.MouseEvent<HTMLDivElement>) => void;
	activeParent: string;
	focusedIndex: number;
	activeClinic: string;
}) {
	return (
		<div onClick={handleParent}>
			{data?.map((item, index) => {
				const {
					_id,
					clinicId,
					parent: { name, petNames, mobile, parentId },
				} = item;
				const active = focusedIndex === index;
				const currentActiveParent = activeParent === _id;
				return (
					<div
						key={_id}
						id={_id}
						data-id={_id}
						data-parentid={parentId}
						data-clinicid={clinicId}
						className={`border-b-grey-border1 hover:bg-green-3 cursor-pointer border-b p-16 ${
							active ? 'bg-green-3' : ''
						}`}
					>
						<div className="flex justify-between gap-24">
							<div className="flex flex-1 items-center gap-24">
								{currentActiveParent ? (
									<RadioFilledIcon className="size-24" />
								) : (
									<RadioUnfilledIcon className="size-24" />
								)}
								<div className="">
									<div className="flex gap-12">
										<span className="text-14">{name}</span>
										<span className="text-14 text-grey-text3">
											({mobile})
										</span>
									</div>
									{!currentActiveParent && (
										<div className="mt-12 flex items-center gap-12">
											<span className="text-14 font-medium">
												Pets:{' '}
											</span>
											{petNames.map((pet) => (
												<span
													className="text-14"
													key={pet}
												>
													{pet}
												</span>
											))}
										</div>
									)}
								</div>
							</div>
							{active && !currentActiveParent && (
								<div className="flex items-center gap-6">
									<span className="text-14">Select</span>
									<div className="rounded-8 border-grey-divider flex size-24 items-center justify-center border bg-white p-4">
										<EnterIcon />
									</div>
								</div>
							)}
						</div>
						{currentActiveParent && (
							<Pets
								activeParent={activeParent}
								activeClinic={activeClinic}
							/>
						)}
					</div>
				);
			})}
		</div>
	);
}

export default memo(Parent);
