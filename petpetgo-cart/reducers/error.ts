import { ERROR_ACTION } from '../constants/ActionTypes';

export type ErrorReducerAction = GENERAL_ERROR | CLEAN_ERROR;

interface Action {
	type: ERROR_ACTION;
	payload?: unknown;
}

interface GENERAL_ERROR extends Action {
	/** 發生Error */
	type: ERROR_ACTION.GENERAL_ERROR;
	/** 錯誤訊息 */
	payload: ErrorState;
}

interface CLEAN_ERROR extends Action {
	/** 清空Error */
	type: ERROR_ACTION.CLEAN_ERROR;
}

export interface ErrorState {
	/** 錯誤的status code */
	code?: number;
	/** 錯誤訊息 */
	message?: string;
}

export default function errorReducer(
	state: ErrorState | null,
	action: ErrorReducerAction,
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
