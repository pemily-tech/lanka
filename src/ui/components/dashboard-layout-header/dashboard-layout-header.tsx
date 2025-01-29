import ClinicDetails from './components/clinic-details';

export function DashboardLayoutHeader({ scrolled }: { scrolled: boolean }) {
	return (
		<header
			className={`bg-grey-bg3 fixed top-0 z-[9] ml-[282px] w-[calc(100vw-282px)] pr-16 transition-all duration-150 ${
				scrolled && 'shadow-2'
			}`}
		>
			<div className="flex items-center justify-between gap-12 py-24">
				<ClinicDetails />
			</div>
		</header>
	);
}

export default DashboardLayoutHeader;
