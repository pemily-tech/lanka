import UserTabs from './_ui/tabs';
import UserDetails from './_ui/user-details';

const Page = () => {
	return (
		<div className="flex flex-col gap-8 rounded-lg bg-white p-4 shadow-md">
			<UserDetails />
			<UserTabs />
		</div>
	);
};

export default Page;
