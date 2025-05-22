import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { UploadIcon } from 'lucide-react';

import { medicalRecordsFilters } from '../../../../helpers/constant';
import { ModalTypes } from '../../../../helpers/primitives';
import { firstCharCapital } from '../../../../helpers/utils';
import { openModal } from '../../../../store/modal';
import FilterItem, {
	FilterIcon,
	FilterLabel,
} from '../../filter-item/filter-item';
import Tooltip from '../../tooltip/tooltip';

import { Button } from '@/ui/shared/button';

export default function Filters({
	activeFilter,
	setActiveFilter,
	petId,
	setShowSidebar,
	refetchRecords,
}: {
	activeFilter: string;
	setActiveFilter: (filter: string) => void;
	petId: string | undefined;
	setShowSidebar: (sidebar: boolean) => void;
	refetchRecords: () => void;
}) {
	const dispatch = useDispatch();

	const openParents = () => {
		dispatch(
			openModal({
				isOpen: true,
				view: ModalTypes.SEARCH_PARENTS,
				center: false,
				maxWidth: 'max-w-3xl',
				data: {
					type: 'medical-records',
					activeFilter,
					refetch: refetchRecords,
				},
			})
		);
	};

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		const buttonElement = (event.target as HTMLElement).closest('button');
		const filter = buttonElement?.getAttribute('data-id') as string;
		if (filter) {
			setActiveFilter(filter);
		}
	};

	return (
		<div
			className="my-12 flex items-center justify-between gap-12"
			onClick={handleClick}
		>
			<div className="flex gap-12">
				{medicalRecordsFilters?.map((record: any) => {
					const active = activeFilter === record.value;
					return (
						<FilterItem
							active={active}
							value={record.value}
							key={record.id}
						>
							<FilterIcon active={active}>
								{record.icon()}
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
					content={`Upload ${firstCharCapital(activeFilter)}`}
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
					<span className="text-14 font-bold">{`Upload ${firstCharCapital(
						activeFilter
					)}`}</span>
				</Button>
			)}
		</div>
	);
}
