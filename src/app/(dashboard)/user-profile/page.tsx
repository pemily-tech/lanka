import ProfileImage from './ui/profile-image';
import UserTabs from './ui/tabs';

const Page = () => {
	return (
		<section className="grid grid-cols-3 items-start gap-32">
			<ProfileImage />
			<UserTabs />
		</section>
	);
};

export default Page;
