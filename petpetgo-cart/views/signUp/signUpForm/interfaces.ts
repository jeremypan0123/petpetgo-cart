import { UserIdentity } from 'petpetgocart/contexts/UserContext/interfaces';

export interface SignUpFormProps {
	/** 註冊使用者 */
	onSubmit: (userIdentity: UserIdentity) => void;
}
