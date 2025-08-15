// {
//     "items": [
//         {
//             "_id": "679b584f42756e288dc20274",
//             "itemId": "1738233935298354",
//             "name": "Yfdtuet",
//             "clinicId": "172243299304890",
//             "type": "PRODUCT",
//             "description": "Cry",
//             "quantity": 4,
//             "mrp": 1234,
//             "price": 123,
//             "discount": 1111,
//             "gstInPercent": 0,
//             "active": true,
//             "updatedBy": "172243299304890",
//             "itemTotal": 492,
//             "itemSubTotal": 4936,
//             "itemDiscount": 4444
//         }
//     ],
//     "totalAmount": 492,
//     "paidAmount": 0,
//     "dueAmount": 492,
//     "totalDiscount": 4444,
//     "subTotalAmount": 4936,
//     "billByName": "Subo0",
//     "billByMobile": "9666666666",
//     "billByAddress": {
//         "pincode": "110043",
//         "line1": "Tuto",
//         "line2": "Life",
//         "state": "DELHI",
//         "district": "South West Delhi"
//     },
//     "billToName": "Vwvsv",
//     "billToMobile": "9467940764",
//     "termsAndConditions": []
// }

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AppConstants } from '@/helpers/primitives';
import { HttpService } from '@/services/http-service';
import { type IInvoice } from '@/types/bills-items';
import { type IApiResponse } from '@/types/common';

const createInvoice = async (invoiceNo, invoicePayload) => {
	const { data } = await HttpService.patch<
		IApiResponse<{ invoice: IInvoice }>
	>(`invoice/update/${invoiceNo}`, invoicePayload);
	return data;
};

export function useCreateInvoice(invoiceNo: string) {
	return useMutation({
		mutationFn: (payload: any) => createInvoice(invoiceNo, payload),
		onSuccess: (data) => {
			if (data?.status === AppConstants.Success) {
				toast.success('Invoice created Successfully!');
			} else {
				toast.error('Something went wrong. Please try again');
			}
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
}
