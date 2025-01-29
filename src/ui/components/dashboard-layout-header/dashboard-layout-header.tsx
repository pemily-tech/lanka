import ClinicDetails from './components/clinic-details';

export function DashboardLayoutHeader() {
	return (
		<header className="flex h-[72px] shrink-0 items-center justify-between gap-12 border-b bg-white px-16">
			<div className="flex items-center justify-between gap-12 py-24">
				<ClinicDetails />
			</div>
		</header>
	);
}

export default DashboardLayoutHeader;
