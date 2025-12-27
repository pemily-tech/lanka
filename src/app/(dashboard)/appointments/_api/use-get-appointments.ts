import { type DateRange } from 'react-day-picker';
import { useQuery } from '@tanstack/react-query';

export interface Appointment {
	_id: string;
	prescriptionNo: string;
	date: string;
	doctorName: string;
	parentName: string;
	patientName: string;
	status: 'active' | 'inactive';
}

export interface AppointmentResponse {
	data: Appointment[];
	totalCount: number;
}

type GetAppointmentsParams = {
	service?: 'doctor' | 'grooming';
	dateRange?: DateRange;
	search?: string;
	status?: 'all' | 'active' | 'inactive';
};

export function useGetAppointments(params: GetAppointmentsParams) {
	const { service, dateRange, search, status } = params;

	return useQuery<AppointmentResponse>({
		queryKey: [
			'appointments',
			service,
			dateRange?.from,
			dateRange?.to,
			search,
			status,
		],

		queryFn: async () => {
			// 🔹 TEMP MOCK (replace with API later)
			const allData: Appointment[] = [
				{
					_id: '1',
					prescriptionNo: 'RX-1001',
					date: '2025-12-25',
					doctorName: 'Dr. Sharma',
					parentName: 'Rahul Verma',
					patientName: 'Bruno',
					status: 'active',
				},
				{
					_id: '2',
					prescriptionNo: 'RX-1002',
					date: '2025-12-26',
					doctorName: 'Dr. Mehta',
					parentName: 'Anita Singh',
					patientName: 'Kitty',
					status: 'inactive',
				},
			];

			// 🔹 Filter by status
			let filtered = allData;
			if (status && status !== 'all') {
				filtered = filtered.filter((item) => item.status === status);
			}

			// 🔹 Filter by search
			if (search) {
				filtered = filtered.filter((item) =>
					item.doctorName.toLowerCase().includes(search.toLowerCase())
				);
			}

			// 🔹 Filter by date range
			if (dateRange?.from && dateRange?.to) {
				filtered = filtered.filter((item) => {
					const d = new Date(item.date);
					return d >= dateRange.from! && d <= dateRange.to!;
				});
			}

			return {
				data: filtered,
				totalCount: filtered.length,
			};
		},
	});
}
