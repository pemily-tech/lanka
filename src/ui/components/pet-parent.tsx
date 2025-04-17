import { type IPetParent } from '../../types/clinic';
import UserProfileImage from './user-profile';

const PetParent = ({
	parent,
	handlePetParent,
	active = false,
}: {
	parent: IPetParent;
	handlePetParent: (p: IPetParent) => void;
	active?: boolean;
}) => {
	return (
		<div
			onClick={() => handlePetParent(parent)}
			className={`rounded-6 mb-12 w-full cursor-pointer border p-12 ${
				active ? 'bg-brand' : 'bg-white'
			}`}
		>
			<section className="flex gap-24">
				<UserProfileImage
					id={parent?.parent?.parentId}
					containerClasses="w-[52px] h-[52px]"
					imageClasses="!rounded-8"
					iconHeight={52}
					iconWidth={52}
					iconColor={active ? '#FFF' : '#D9D9D9'}
				/>
				<section
					className={`flex-1 ${active ? 'text-white' : 'text-black-1'}`}
				>
					<p className="text-16 text-left font-medium">
						{parent?.parent?.name}
					</p>
					<p className="text-14 text-left leading-[30px]">
						Pets: {parent?.parent?.petNames.join(',')}
					</p>
					<p className="text-14 text-left leading-[30px]">
						{parent?.parent?.mobile}
					</p>
				</section>
			</section>
		</div>
	);
};

export default PetParent;
