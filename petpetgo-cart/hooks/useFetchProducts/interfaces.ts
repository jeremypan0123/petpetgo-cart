import { FETCH_PRODUCT_ACTION } from '../../constants/ActionTypes';
import { ProductField } from '../../helpers/createMockData';

export type ReducerAction =
	| FetchProductStart
	| FetchProductSuccess
	| FetchProductFailure;

interface Action {
	type: FETCH_PRODUCT_ACTION;
	payload?: unknown;
}

interface FetchProductStart extends Action {
	/** 正在取得商品資訊 */
	type: FETCH_PRODUCT_ACTION.FETCH_PRODUCT_START;
}

interface FetchProductSuccess extends Action {
	/** 成功拿到商品列表 */
	type: FETCH_PRODUCT_ACTION.FETCH_PRODUCT_SUCCESS;
	/** 取得的商品資訊 */
	payload: ProductField[];
}

interface FetchProductFailure extends Action {
	/** 無法取得商品資訊 */
	type: FETCH_PRODUCT_ACTION.FETCH_PRODUCT_FAILURE;
	/** 失敗的原因 */
	payload: { message: string };
}

export interface FetchProductsState {
	/** 商品資訊 */
	products: ProductField[];
	/** 是否正在取得商品資訊 */
	loading: boolean;
	/** 無法取得商品資訊的原因 */
	error: { code?: number; message: string } | null;
}
