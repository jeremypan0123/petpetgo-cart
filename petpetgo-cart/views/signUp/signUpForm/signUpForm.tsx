import { memo, useState, FormEvent, ChangeEvent, useRef } from 'react';

/** Component */
import { FormGroup, InputGroup, Button } from '@blueprintjs/core';

/** Interface */
import { SignUpFormProps } from './interfaces';
import { UserIdentity } from 'petpetgocart/contexts/UserContext/interfaces';

const SignUpForm = memo((props: SignUpFormProps) => {
	const { onSubmit } = props;

	const [loading, setLoading] = useState<boolean>(false);

	const formData = useRef<UserIdentity>({
		username: '',
		phoneOrEmail: '',
	});

	const onUsernameChange = (e: ChangeEvent<HTMLInputElement>): void => {
		formData.current = {
			...formData.current,
			username: e.target.value,
		};
	};

	const onPhoneOrEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
		formData.current = {
			...formData.current,
			phoneOrEmail: e.target.value,
		};
	};

	/** 註冊 */
	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		setLoading(true);
		e.preventDefault();

		await onSubmit(formData.current);
		setLoading(false);
	};

	return (
		<form onSubmit={handleSubmit}>
			<FormGroup label="姓名" labelFor="text-input" labelInfo="(required)">
				<InputGroup
					id="text-input"
					placeholder="請輸入姓名"
					onChange={onUsernameChange}
				/>
			</FormGroup>

			<FormGroup label="手機號碼" labelFor="text-input" labelInfo="(required)">
				<InputGroup
					id="text-input"
					placeholder="請輸入手機號碼或 Email"
					onChange={onPhoneOrEmailChange}
				/>
			</FormGroup>

			<Button type="submit" icon="log-in" disabled={loading}>
				{'註冊'}
			</Button>
		</form>
	);
});

export default SignUpForm;
