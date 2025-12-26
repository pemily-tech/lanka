import { useQuery } from '@tanstack/react-query';

export interface Appointment {
	_id: string;
	date: string;
	time: string;
	doctorName: string;
	status: string;
}

export interface AppointmentResponse {
	data: Appointment[];
	totalCount: number;
}

export function useGetAppointments() {
	return useQuery<AppointmentResponse>({
		queryKey: ['appointments'],
		queryFn: async () => {
			return {
				data: [
					{
						_id: '1',
						date: '2025-12-25',
						time: '10:00 AM',
						doctorName: 'Dr. Sharma',
						status: 'Pending',
					},
				],
				totalCount: 1,
			};
		},
	});
}
