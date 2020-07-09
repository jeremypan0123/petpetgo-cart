import { createContext, Context, useState } from 'react';

/** Interface */
import { UserContextValue, UserContextProps, UserIdentity } from './interfaces';

export const UserContext: Context<UserContextValue> = createContext<
	UserContextValue
>(null);

const UserContextProvider = (props: UserContextProps) => {
	const { children } = props;

	const [users, setUsers] = useState<UserIdentity[]>([
		{ username: '1', phoneOrEmail: '1' },
		{ username: '2', phoneOrEmail: '2' },
		{ username: '3', phoneOrEmail: '3' },
		{ username: '4', phoneOrEmail: '4' },
		{ username: '5', phoneOrEmail: '5' },
		{ username: '6', phoneOrEmail: '6' },
	]);

	return (
		<UserContext.Provider value={{ users, setUsers }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
