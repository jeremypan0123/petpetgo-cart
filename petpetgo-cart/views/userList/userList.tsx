import { useContext } from 'react';

import UserTable from './userTable';
import { UserContext } from 'petpetgocart/contexts/UserContext';

const UserList = () => {
	const { users } = useContext(UserContext);
	console.log(users);

	return <UserTable />;
};

export default UserList;
