import { createContext, useContext } from 'react';
import {
	type PaginationState,
	type RowSelectionState,
} from '@tanstack/react-table';

export type IInvoiceListingContextType = {
	value: string;
	handleSearchChange: (value: string) => void;
	data: IInvoiceTypes.IInvoice[];
	isFetching: boolean;
	rowSelection: RowSelectionState;
	setRowSelection: (state: RowSelectionState) => void;
	refetch: () => void;
	pagination: PaginationState;
	setPagination: (state: PaginationState) => void;
	apiKey: string;
	totalCount: number;
};

export const InvoiceListingContext = createContext<
	IInvoiceListingContextType | undefined
>(undefined);

export const useInvoiceListingContext = () => {
	const context = useContext(InvoiceListingContext);
	if (!context) {
		throw new Error(
			'useInvoiceListingContext must be used within a InvoiceListingContext.Provider'
		);
	}
	return context;
};
