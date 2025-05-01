import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { UploadIcon } from 'lucide-react';

import {
	vaccinationClinicFilters,
	vaccinationPetFilters,
} from '../../../../helpers/constant';
import { ModalTypes } from '../../../../helpers/primitives';
import { openModal } from '../../../../store/modal';
import { Button } from '../../../shared/button';
import FilterItem, {
	FilterIcon,
	FilterLabel,
} from '../../filter-item/filter-item';
import Tooltip from '../../tooltip/tooltip';

export default function Filters({
	activeFilter,
	setActiveFilter,
	petId,
	setShowSidebar,
	refetch,
}: {
	activeFilter: string;
	setActiveFilter: (filter: string) => void;
	petId: string | undefined;
	setShowSidebar: (sidebar: boolean) => void;
	refetch: () => void;
}) {
	const dispatch = useDispatch();
	const filters = petId ? vaccinationPetFilters : vaccinationClinicFilters;

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		const buttonElement = (event.target as HTMLElement).closest('button');
		const filter = buttonElement?.getAttribute('data-id') as string;
		if (filter) {
			setActiveFilter(filter);
		}
	};

	const openParents = () => {
		dispatch(
			openModal({
				isOpen: true,
				view: ModalTypes.SEARCH_PARENTS,
				center: false,
				maxWidth: 'max-w-3xl',
				data: {
					type: 'follow-up',
					activeFilter,
					refetch,
				},
			})
		);
	};

	return (
		<div
			className="my-12 flex items-center justify-between gap-12"
			onClick={handleClick}
		>
			<div className="flex gap-12">
				{filters?.map((record: any) => {
					const active = activeFilter === record.value;
					return (
						<FilterItem
							active={active}
							value={record.value}
							key={record.id}
						>
							<FilterIcon active={active}>
								{record?.icon()}
							</FilterIcon>
							<FilterLabel active={active}>
								{record.label}
							</FilterLabel>
						</FilterItem>
					);
				})}
			</div>
			{petId ? (
				<Tooltip
					content="Upload Followup"
					placement="top"
					arrow
					animation="shift-away"
				>
					<Button
						onClick={() => setShowSidebar(true)}
						className="w-42 h-42 bg-primary shadow-base hover:border-primary-1 group rounded-full p-6 hover:border hover:bg-white"
					>
						<motion.div
							whileHover={{ rotate: 360 }}
							transition={{ duration: 0.5 }}
						>
							<UploadIcon className="group-hover:text-primary !size-16 text-white" />
						</motion.div>
					</Button>
				</Tooltip>
			) : (
				<Button
					onClick={openParents}
					className="min-w-[180px] max-w-[240px] !px-12"
				>
					<span className="text-14 font-bold">Add Follow-up</span>
				</Button>
			)}
		</div>
	);
}
