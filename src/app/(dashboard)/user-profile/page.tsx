import UserTabs from './_ui/tabs';
import UserDetails from './_ui/user-details';

const Page = () => {
	return (
		<div className="shadow-card flex flex-col gap-8 rounded-lg bg-white p-4">
			<UserDetails />
			<UserTabs />
		</div>
	);
};

export default Page;
