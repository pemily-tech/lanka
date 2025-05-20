import UserTabs from './_ui/tabs';
import UserDetails from './_ui/user-details';

const Page = () => {
	return (
		<div className="shadow-card1 flex flex-col gap-32 rounded-[16px] bg-white p-16">
			<UserDetails />
			<UserTabs />
		</div>
	);
};

export default Page;
