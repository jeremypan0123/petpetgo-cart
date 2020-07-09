import { useContext } from 'react';

import UserTable from './userTable';
import { UserContext } from 'petpetgocart/contexts/UserContext';

const UserList = () => {
	const { users } = useContext(UserContext);

	return users ? <UserTable users={users} /> : <p>無使用者</p>;
};

export default UserList;
