import { DO_SOMETHING_ASYNC_ACTION } from '../constants/ActionTypes';

interface Action {
	type: DO_SOMETHING_ASYNC_ACTION;
}

export default function disableChangeAmountReducer(
	state: boolean,
	action: Action,
) {
	switch (action.type) {
		case DO_SOMETHING_ASYNC_ACTION.DO_SOMETHING_ASYNC:
			return true;
		case DO_SOMETHING_ASYNC_ACTION.DO_SOMETHING_ASYNC_SUCCESS:
			return false;
		default:
			return state;
	}
}
