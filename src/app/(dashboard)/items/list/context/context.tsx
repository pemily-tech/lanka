import { createContext, useContext } from 'react';
import {
	type PaginationState,
	type RowSelectionState,
} from '@tanstack/react-table';

export type IProductListingContextType = {
	value: string;
	handleSearchChange: (value: string) => void;
	data: IInvoiceTypes.IProduct[];
	isFetching: boolean;
	rowSelection: RowSelectionState;
	setRowSelection: (state: RowSelectionState) => void;
	refetch: () => void;
	pagination: PaginationState;
	setPagination: (state: PaginationState) => void;
	apiKey: string;
	totalCount: number;
	type: 'PRODUCT' | 'SERVICE';
	setType: (type: 'PRODUCT' | 'SERVICE') => void;
};

export const ProductListingContext = createContext<
	IProductListingContextType | undefined
>(undefined);

export const useProductListingContext = () => {
	const context = useContext(ProductListingContext);
	if (!context) {
		throw new Error(
			'useProductListingContext must be used within a ProductListingContext.Provider'
		);
	}
	return context;
};
