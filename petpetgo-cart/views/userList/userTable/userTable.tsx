import { Cell, Column, Table } from '@blueprintjs/table';

const cellRenderer = (rowIndex: number) => {
	return <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>;
};
const UserTable = () => {
	return (
		<Table numRows={10}>
			<Column name="Dollars" cellRenderer={cellRenderer} />
		</Table>
	);
};

export default UserTable;
