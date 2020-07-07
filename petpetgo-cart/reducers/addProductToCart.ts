import { ADD_PRODUCT_TO_CART_ACTION } from '../constants/ActionTypes';
import { ProductField } from '../components/Product/interfaces';

type ReducerAction =
	| ADD_PRODUCT_TO_CART
	| ADD_PRODUCT_TO_CART_SUCCESS
	| ADD_PRODUCT_TO_CART_FAILURE
	| ADD_PRODUCT_TO_CART_RESET;

export interface Action {
	type: ADD_PRODUCT_TO_CART_ACTION;
	payload?: unknown;
}

interface ADD_PRODUCT_TO_CART extends Action {
	type: ADD_PRODUCT_TO_CART_ACTION.ADD_PRODUCT_TO_CART;
	payload: { product: ProductField };
}

interface ADD_PRODUCT_TO_CART_SUCCESS extends Action {
	type: ADD_PRODUCT_TO_CART_ACTION.ADD_PRODUCT_TO_CART_SUCCESS;
	payload: { product: ProductField };
}

interface ADD_PRODUCT_TO_CART_FAILURE extends Action {
	type: ADD_PRODUCT_TO_CART_ACTION.ADD_PRODUCT_TO_CART_FAILURE;
	payload: { product: ProductField; error: string };
}

interface ADD_PRODUCT_TO_CART_RESET extends Action {
	type: ADD_PRODUCT_TO_CART_ACTION.ADD_PRODUCT_TO_CART_RESET;
}

interface AddProductToCartState {
	product: ProductField;
	checking: boolean;
	error: string | null;
}

export default function addProductToCart(
	state: AddProductToCartState,
	action: ReducerAction,
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
