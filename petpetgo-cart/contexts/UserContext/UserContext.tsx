import { createContext, Context, useState } from 'react';

/** Interface */
import { UserContextValue, UserContextProps, UserIdentity } from './interfaces';

export const UserContext: Context<UserContextValue> = createContext<
	UserContextValue
>(null);

const UserContextProvider = (props: UserContextProps) => {
	const { children } = props;

	const [users, setUsers] = useState<UserIdentity[]>();

	return (
		<UserContext.Provider value={{ users, setUsers }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
