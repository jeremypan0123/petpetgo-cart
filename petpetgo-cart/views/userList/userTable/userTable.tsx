import { memo } from 'react';

import { Cell, Column, Table } from '@blueprintjs/table';

/** Interface */
import { UserTableProps } from './interfaces';

const UserTable = memo((props: UserTableProps) => {
	const { users, deleteUser } = props;

	const usernameRenderer = (rowIndex: number): JSX.Element => {
		return <Cell>{users[rowIndex].username}</Cell>;
	};
	const phoneOrEmailRenderer = (rowIndex: number): JSX.Element => {
		return <Cell>{users[rowIndex].phoneOrEmail}</Cell>;
	};
	const deleteRenderer = (rowIndex: number): JSX.Element => {
		return (
			<Cell>
				<button onClick={() => deleteUser(rowIndex)}>刪除</button>
			</Cell>
		);
	};

	return (
		<Table numRows={users.length}>
			<Column name="使用者" cellRenderer={usernameRenderer} />
			<Column name="電話 / Email" cellRenderer={phoneOrEmailRenderer} />
			<Column name="刪除" cellRenderer={deleteRenderer} />
		</Table>
	);
});

export default UserTable;
