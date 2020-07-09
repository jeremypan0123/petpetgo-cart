import { ReactNode, Dispatch, SetStateAction } from 'react';

/** UserContext的interface */
export interface UserContextValue {
	/** 存在Context的使用者名單 */
	users: UserIdentity[];
	/** 更新使用者 */
	setUsers: Dispatch<SetStateAction<UserIdentity[]>>;
}

export interface UserContextProps {
	children: ReactNode;
}

/** 使用者的身分 */
export interface UserIdentity {
	/** 使用者姓名 */
	username: string;
	/** 使用者的電話或Email */
	phoneOrEmail: string;
}
