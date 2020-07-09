import { ReactNode } from 'react';

export interface TableProps {
	children: ReactNode;
	// tableData: TableData;
}

export interface TableData {
	header: string[];
}
