/* eslint-disable unicorn/filename-case */
import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { HttpService } from '@/services/http-service';
import { type ISchedule } from '@/types/clinic';
import { type IApiResponse } from '@/types/common';

interface IParams {
	appointmentDate: string;
	type: 'CLINIC';
	slotType: 'SIXTY_MINUTE';
	doctorId?: string;
}

const getDoctorSlots = async ({
	queryKey,
}: QueryFunctionContext<[string, IParams]>) => {
	const [_key, params] = queryKey;

	const { doctorId, appointmentDate, type, slotType } = params;

	let url = `${_key}?type=${type}&slotType=${slotType}&appointmentDate=${appointmentDate}`;

	if (doctorId) {
		url = `${url}&doctorId=${doctorId}`;
	}

	const { data } =
		await HttpService.get<IApiResponse<{ schedules: ISchedule[] }>>(url);

	return data;
};

export function useGetDoctorSlots(params: IParams) {
	return useQuery({
		queryKey: ['appointment/calendar', params],
		queryFn: getDoctorSlots,
		enabled:
			!!params?.appointmentDate &&
			!!params?.type &&
			!!params?.slotType &&
			!!params?.doctorId,
	});
}
