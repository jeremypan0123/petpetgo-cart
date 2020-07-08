import { createContext, Context, useState } from 'react';

/** Interface */
import { UserContextValue, UserContextProps, UserIdentity } from './interfaces';

export const UserContext: Context<UserContextValue> = createContext<
	UserContextValue
>(null);

const UserContextProvider = (props: UserContextProps) => {
	const { children } = props;

	const [users, setUsers] = useState<UserIdentity[]>();

	/** 新增使用者 */
	const addUser = (userIdentity: UserIdentity) => {
		setUsers((prev) =>
			prev ? [...prev, { ...userIdentity }] : [{ ...userIdentity }],
		);
	};

	return (
		<UserContext.Provider value={{ users, addUser }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
