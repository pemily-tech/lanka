import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { ApiEndpoints } from '../../helpers/primitives';
import { HttpService } from '../../services/http-service';
import { type ICertificateApiResponse } from '../../types/clinic';
import { type IApiResponse } from '../../types/common';

import { env } from '@/env.mjs';

const getPetCertificateVaccination = async ({
	queryKey,
}: QueryFunctionContext<[string, string | undefined]>) => {
	const [_key, petId] = queryKey;
	const url = `${env.NEXT_PUBLIC_BASE_PATH}/${_key}/${petId}/VACCINATION`;
	const { data } =
		await HttpService.get<IApiResponse<ICertificateApiResponse>>(url);
	return data;
};

export function usePetCertificateVaccination({
	type,
	petId,
}: {
	type: string;
	petId: string;
}) {
	return useQuery({
		queryKey: [ApiEndpoints.VaccinationCertificate, petId],
		queryFn: getPetCertificateVaccination,
		enabled: !!type,
	});
}

export default usePetCertificateVaccination;
