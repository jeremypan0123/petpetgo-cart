import { useContext, useCallback } from 'react';

import UserTable from './userTable';
import { UserContext } from 'petpetgocart/contexts/UserContext';

const UserList = () => {
	const { users, setUsers } = useContext(UserContext);

	const deleteUser = useCallback(
		(rowIndex: number): void => {
			/** 根據index刪除特定User */
			setUsers((users) => [
				...users.slice(0, rowIndex),
				...users.slice(rowIndex + 1),
			]);
		},
		[setUsers],
	);

	/** FIXME: passing users and deleteUser props is not a good design */
	return users?.length ? (
		<>
			<UserTable users={users} deleteUser={deleteUser} />
		</>
	) : (
		<p>無使用者</p>
	);
};

export default UserList;
