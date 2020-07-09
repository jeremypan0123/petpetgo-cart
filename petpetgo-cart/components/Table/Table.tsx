import { TableProps } from './interfaces';

import { Cell, Column, Table as BpTable } from '@blueprintjs/table';

const Table = (props: TableProps) => {
	const { children } = props;

	return <BpTable>{children}</BpTable>;
};

export default Table;
