import { ADD_PRODUCT_TO_CART_ACTION } from '../constants/ActionTypes';
import { ProductField } from '../components/Product/interfaces';

export type AddProductToCartReducerAction =
	| ADD_PRODUCT_TO_CART
	| ADD_PRODUCT_TO_CART_SUCCESS
	| ADD_PRODUCT_TO_CART_FAILURE
	| ADD_PRODUCT_TO_CART_RESET;

export interface Action {
	type: ADD_PRODUCT_TO_CART_ACTION;
	payload?: unknown;
}

interface ADD_PRODUCT_TO_CART extends Action {
	/** 開始將商品加入購物車 */
	type: ADD_PRODUCT_TO_CART_ACTION.ADD_PRODUCT_TO_CART;
	/** 商品資訊 */
	payload: { product: ProductField };
}

interface ADD_PRODUCT_TO_CART_SUCCESS extends Action {
	/** 成功將商品加入購物車 */
	type: ADD_PRODUCT_TO_CART_ACTION.ADD_PRODUCT_TO_CART_SUCCESS;
	/** 成功加入購物車的商品 */
	payload: { product: ProductField };
}

interface ADD_PRODUCT_TO_CART_FAILURE extends Action {
	/** 無法將商品加入購物車 */
	type: ADD_PRODUCT_TO_CART_ACTION.ADD_PRODUCT_TO_CART_FAILURE;
	/** 商品與失敗原因 */
	payload: { product: ProductField; error: string };
}

interface ADD_PRODUCT_TO_CART_RESET extends Action {
	/** 清空加入購物車的狀態 */
	type: ADD_PRODUCT_TO_CART_ACTION.ADD_PRODUCT_TO_CART_RESET;
}

export interface AddProductToCartState {
	/** 將要加入購物車的商品 */
	product: ProductField;
	/** 是否正在將商品加入購物車 */
	checking: boolean;
	/** 無法將商品加入購物車的原因 */
	error: string | null;
}

export default function addProductToCart(
	state: AddProductToCartState,
	action: AddProductToCartReducerAction,
): AddProductToCartState {
	switch (action.type) {
		case ADD_PRODUCT_TO_CART_ACTION.ADD_PRODUCT_TO_CART:
			return {
				product: { ...action.payload.product },
				checking: true,
				error: null,
			};
		case ADD_PRODUCT_TO_CART_ACTION.ADD_PRODUCT_TO_CART_SUCCESS:
			return {
				product: action.payload.product,
				checking: false,
				error: null,
			};
		case ADD_PRODUCT_TO_CART_ACTION.ADD_PRODUCT_TO_CART_FAILURE:
			return {
				product: action.payload.product,
				checking: false,
				error: action.payload.error,
			};
		case ADD_PRODUCT_TO_CART_ACTION.ADD_PRODUCT_TO_CART_RESET:
			return {
				product: null,
				checking: false,
				error: null,
			};
		default:
			return state;
	}
}
