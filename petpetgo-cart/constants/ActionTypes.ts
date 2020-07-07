// cart
export enum CART_ACTION {
	ADD_ITEM = 'ADD_ITEM',
	ADJUST_ITEM_AMOUNT = 'ADJUST_ITEM_AMOUNT',
	DELETE_ITEM = 'DELETE_ITEM',
	CLEAR_CART = 'CLEAR_CART',
}

// // sync product info with server
// export const SYNC_PRODUCTS_INFO_START = 'SYNC_PRODUCTS_INFO_START';
// export const SYNC_PRODUCTS_INFO_SUCCESS = 'SYNC_PRODUCTS_INFO_SUCCESS';
// export const SYNC_PRODUCTS_INFO_FAILURE = 'SYNC_PRODUCTS_INFO_FAILURE';

// for disable changing amount
export enum DO_SOMETHING_ASYNC_ACTION {
	DO_SOMETHING_ASYNC = 'DO_SOMETHING_ASYNC',
	DO_SOMETHING_ASYNC_SUCCESS = 'DO_SOMETHING_ASYNC_SUCCESS',
}

// product
export enum FETCH_PRODUCT_ACTION {
	FETCH_PRODUCT_START = 'FETCH_PRODUCT_START',
	FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS',
	FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE',
}

// // checkout
// export const CHECKOUT_START = 'CHECKOUT_START';
// export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS';
// export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE';

// error
export enum ERROR_ACTION {
	GENERAL_ERROR = 'GENERAL_ERROR',
	CLEAN_ERROR = 'CLEAN_ERROR',
}

// add product tp cart
export enum ADD_PRODUCT_TO_CART_ACTION {
	ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART',
	ADD_PRODUCT_TO_CART_SUCCESS = 'ADD_PRODUCT_TO_CART_SUCCESS',
	ADD_PRODUCT_TO_CART_FAILURE = 'ADD_PRODUCT_TO_CART_FAILURE',
	ADD_PRODUCT_TO_CART_RESET = 'ADD_PRODUCT_TO_CART_RESET',
}
