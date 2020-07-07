import { ERROR_ACTION } from '../constants/ActionTypes';

type ReducerAction = GENERAL_ERROR | CLEAN_ERROR;

interface Action {
	type: ERROR_ACTION;
	payload?: unknown;
}

interface GENERAL_ERROR extends Action {
	type: ERROR_ACTION.GENERAL_ERROR;
	payload: ErrorState;
}

interface CLEAN_ERROR extends Action {
	type: ERROR_ACTION.CLEAN_ERROR;
}

interface ErrorState {
	code?: number;
	message?: string;
}

export default function errorReducer(
	state: ErrorState | null,
	action: ReducerAction,
) {
	switch (action.type) {
		case ERROR_ACTION.GENERAL_ERROR:
			return {
				code: action.payload?.code || null,
				message: action.payload?.message || '',
			};
		case ERROR_ACTION.CLEAN_ERROR:
			return null;

		default:
			return state;
	}
}
