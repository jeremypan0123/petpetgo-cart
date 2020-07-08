import { ReactNode } from 'react';

/** UserContext的interface */
export interface UserContextValue {
	/** 存在Context的使用者名單 */
	users: UserIdentity[];
	/** 加入使用者至Context */
	addUser: (userInfo: UserIdentity) => void;
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
