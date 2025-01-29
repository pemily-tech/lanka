import { useInfiniteQuery } from '@tanstack/react-query';

import { HttpService } from '../../../../services/http-service';

const getPetParentsList = async ({
	pageParam = 0,
	searchTerm,
	limit = 5,
}: {
	pageParam: number;
	searchTerm: string;
	limit: number;
}) => {
	let url = `${process.env.NEXT_PUBLIC_BASE_PATH}/clinic/parents?page=${pageParam}&limit=${limit}`;
	if (searchTerm && searchTerm.length > 2) {
		url += `&searchTerm=${searchTerm}`;
	}
	const { data } =
		await HttpService.get<
			ICommonTypes.IApiResponse<IClinicTypes.IPetParentsApiResponse>
		>(url);

	return {
		data,
		nextPage: data?.data?.parents?.length < limit ? null : pageParam + 1,
	};
};

export function useGetPetParentsList(
	searchTerm: string,
	limit: number,
	type: string
) {
	return useInfiniteQuery({
		queryKey: [type, searchTerm, limit],
		queryFn: ({ pageParam }) =>
			getPetParentsList({ pageParam, searchTerm, limit }),
		initialPageParam: 0,
		getNextPageParam: (lastPage) => lastPage.nextPage,
	});
}
