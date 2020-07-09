import { Cell, Column, Table } from '@blueprintjs/table';

/** Interface */
import { UserTableProps } from './interfaces';

const UserTable = (props: UserTableProps) => {
	const { users } = props;

	const usernameRenderer = (rowIndex: number) => {
		return <Cell>{users[rowIndex].username}</Cell>;
	};

	const phoneOrEmailRenderer = (rowIndex: number) => {
		return <Cell>{users[rowIndex].phoneOrEmail}</Cell>;
	};

	return (
		<Table numRows={users.length}>
			<Column name="使用者" cellRenderer={usernameRenderer} />
			<Column name="電話 / Email" cellRenderer={phoneOrEmailRenderer} />
		</Table>
	);
};

export default UserTable;
