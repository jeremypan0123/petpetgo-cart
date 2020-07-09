import { useCallback } from 'react';

import { Cell, Column, Table } from '@blueprintjs/table';

/** Interface */
import { UserTableProps } from './interfaces';

const UserTable = (props: UserTableProps) => {
	const { users, deleteUser } = props;

	const usernameRenderer = useCallback(
		(rowIndex: number) => {
			return <Cell>{users[rowIndex].username}</Cell>;
		},
		[users],
	);

	const phoneOrEmailRenderer = useCallback(
		(rowIndex: number) => {
			return <Cell>{users[rowIndex].phoneOrEmail}</Cell>;
		},
		[users],
	);

	const deleteRenderer = useCallback(
		(rowIndex: number) => {
			return (
				<Cell>
					<button onClick={() => deleteUser(rowIndex)}>刪除</button>
				</Cell>
			);
		},
		[deleteUser],
	);

	return (
		<Table numRows={users.length}>
			<Column name="使用者" cellRenderer={usernameRenderer} />
			<Column name="電話 / Email" cellRenderer={phoneOrEmailRenderer} />
			<Column name="刪除" cellRenderer={deleteRenderer} />
		</Table>
	);
};

export default UserTable;
