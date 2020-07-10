import { useContext, useCallback } from 'react';
// import { useRouter } from 'next/router';

import SignUpForm from './signUpForm';

/** Context */
import { UserContext } from 'petpetgocart/contexts';

/** Interface */
import { UserIdentity } from 'petpetgocart/contexts/UserContext/interfaces';

import styles from './signUp.module.scss';

const SignUp = () => {
	const { users, setUsers } = useContext(UserContext);
	// const router = useRouter();

	/** 確認使用者輸入的資料為合法 */
	const isValidIdentity = useCallback(
		(userIdentity: UserIdentity): Promise<ValidationStatus> => {
			return new Promise((resolve, reject) => {
				const _userFind = users.find(
					(user) =>
						user.username === userIdentity.username &&
						user.phoneOrEmail === userIdentity.phoneOrEmail,
				);
				if (!_userFind) {
					resolve({ status: 'Success' });
				} else {
					reject({ status: 'Failure', errorMessage: '重複的帳號' });
				}
			});
		},
		[users],
	);

	const onSubmit = useCallback(
		async (userIdentity: UserIdentity): Promise<void> => {
			try {
				/** 檢查使用者資訊 */
				await isValidIdentity(userIdentity);
				/** 新增使用者 */
				setUsers((prev: UserIdentity[] | null) =>
					prev ? [...prev, { ...userIdentity }] : [{ ...userIdentity }],
				);
			} catch (error) {
				console.log(error.errorMessage);
			}

			// /** Navigate to userList page */
			// router.push('/users/userList');
		},
		[setUsers, isValidIdentity],
	);

	return (
		<div className={styles.signup}>
			<div className={styles.signup__wrapper}>
				<SignUpForm onSubmit={onSubmit} />
			</div>
		</div>
	);
};

type Status = 'Success' | 'Failure';
interface ValidationStatus {
	status: Status;
	errorMessage?: string;
}

export default SignUp;
