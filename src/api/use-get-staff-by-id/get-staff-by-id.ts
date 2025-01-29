import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { ApiEndpoints } from '../../helpers/primitives';
import { HttpService } from '../../services/http-service';

const getClinicStaffById = async ({
	queryKey,
}: QueryFunctionContext<[string, string]>) => {
	const [_key, _params] = queryKey;
	let url = `${process.env.NEXT_PUBLIC_BASE_PATH}/${_key}?`;
	if (_params && _params.length > 0) {
		url += `staffId=${_params}`;
	}
	const { data } =
		await HttpService.get<
			ICommonTypes.IApiResponse<IClinicTypes.IClinicStaffResponse>
		>(url);
	return data;
};

export function useGetStaffById(staffId: string) {
	return useQuery({
		queryKey: [ApiEndpoints.StaffList, staffId],
		queryFn: getClinicStaffById,
		enabled: !!staffId,
	});
}

export default useGetStaffById;
