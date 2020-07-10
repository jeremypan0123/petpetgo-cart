import { useContext, useCallback } from 'react';

import UserTable from './userTable';
import { UserContext } from 'petpetgocart/contexts/UserContext';

/** css */
import styles from './userList.module.scss';

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
		<div className={styles.userlist}>
			<div className={styles.userlist__wrapper}>
				<p>使用者名單</p>
				<UserTable users={users} deleteUser={deleteUser} />
			</div>
		</div>
	) : (
		<p>無使用者</p>
	);
};

export default UserList;
