import useGetPetProfileImage from '../../api/use-get-pet-profile-image/get-pet-profile-image';
import { ImagePlaceholder } from '../shared/image';

const Pet = ({
	pet,
	handlePet,
	height = 'h-[160px]',
}: {
	pet: ICommonTypes.IPet;
	handlePet: (pet: ICommonTypes.IPet) => void;
	height?: string;
}) => {
	const { data } = useGetPetProfileImage(pet?.petId as string);

	return (
		<div
			className="border-grey-border2 rounded-8 cursor-pointer border p-8"
			onClick={() => handlePet(pet)}
		>
			{data?.data?.profileUrl && data?.data?.profileUrl !== '' ? (
				<ImagePlaceholder
					src={data?.data?.profileUrl as string}
					containerClasses={`w-full ${height}`}
					imageClasses={`rounded-10 object-cover`}
				/>
			) : (
				<ImagePlaceholder
					src={
						pet.type === 'CAT'
							? '/images/Cat.png'
							: '/images/Dog.png'
					}
					containerClasses={`w-full ${height}`}
					imageClasses="rounded-10 object-cover"
				/>
			)}
			<p className="text-14 pt-8 text-left font-semibold">{pet.name}</p>
		</div>
	);
};

export default Pet;
