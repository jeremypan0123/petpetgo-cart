import { useContext } from 'react';
// import { useRouter } from 'next/router';

import SignUpForm from './signUpForm';

/** Context */
import { UserContext } from 'petpetgocart/contexts';

/** Interface */
import { UserIdentity } from 'petpetgocart/contexts/UserContext/interfaces';

const SignUp = () => {
	const { setUsers } = useContext(UserContext);
	// const router = useRouter();

	const onSubmit = (userIdentity: UserIdentity) => {
		// TODO: 檢查身分是否重複、格式

		/** 新增使用者 */
		setUsers((prev: UserIdentity[] | null) =>
			prev ? [...prev, { ...userIdentity }] : [{ ...userIdentity }],
		);

		// /** Navigate to userList page */
		// router.push('/users/userList');
	};

	return <SignUpForm onSubmit={onSubmit} />;
};

export default SignUp;
