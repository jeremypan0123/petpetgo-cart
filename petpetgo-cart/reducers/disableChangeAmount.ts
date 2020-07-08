import { DO_SOMETHING_ASYNC_ACTION } from '../constants/ActionTypes';

export interface DisableChangeAmountReducerAction {
	type: DO_SOMETHING_ASYNC_ACTION;
}

export type disableChangeAmountState = boolean;

export default function disableChangeAmountReducer(
	state: disableChangeAmountState,
	action: DisableChangeAmountReducerAction,
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
