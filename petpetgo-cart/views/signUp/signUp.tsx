import { useContext } from 'react';
import { useRouter } from 'next/router';

import SignUpForm from './signUpForm';

/** Context */
import { UserContext } from 'petpetgocart/contexts';
import { UserIdentity } from 'petpetgocart/contexts/UserContext/interfaces';

const SignUp = () => {
	const { addUser } = useContext(UserContext);
	const router = useRouter();

	const onSubmit = (userIdentity: UserIdentity) => {
		// TODO: 檢查身分是否重複、格式

		/** Navigate to userList page */
		addUser({ ...userIdentity });

		router.push('/users/userList');
	};

	return <SignUpForm onSubmit={onSubmit} />;
};

export default SignUp;
