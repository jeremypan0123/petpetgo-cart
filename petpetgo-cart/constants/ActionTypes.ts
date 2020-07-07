// cart
export enum CART_ACTION {
	/** 將商品加入購物車 */
	ADD_ITEM = 'ADD_ITEM',
	/** 調整購物車內的商品數量 */
	ADJUST_ITEM_AMOUNT = 'ADJUST_ITEM_AMOUNT',
	/** 從購物車刪除商品 */
	DELETE_ITEM = 'DELETE_ITEM',
	/** 清空購物車 */
	CLEAR_CART = 'CLEAR_CART',
}

// // sync product info with server
// export const SYNC_PRODUCTS_INFO_START = 'SYNC_PRODUCTS_INFO_START';
// export const SYNC_PRODUCTS_INFO_SUCCESS = 'SYNC_PRODUCTS_INFO_SUCCESS';
// export const SYNC_PRODUCTS_INFO_FAILURE = 'SYNC_PRODUCTS_INFO_FAILURE';

// for disable changing amount
/** 模擬處理一些 Async的行為 */
export enum DO_SOMETHING_ASYNC_ACTION {
	/** 開始處理Async的行為 */
	DO_SOMETHING_ASYNC = 'DO_SOMETHING_ASYNC',
	/** 處理完畢 */
	DO_SOMETHING_ASYNC_SUCCESS = 'DO_SOMETHING_ASYNC_SUCCESS',
}

// product
/** 取得商品資訊 */
export enum FETCH_PRODUCT_ACTION {
	/** 開始取得商品資訊 */
	FETCH_PRODUCT_START = 'FETCH_PRODUCT_START',
	/** 成功取得商品資訊 */
	FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS',
	/** 無法取得商品資訊 */
	FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE',
}

// // checkout
// export const CHECKOUT_START = 'CHECKOUT_START';
// export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS';
// export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE';

// error
export enum ERROR_ACTION {
	/** 發生錯誤 */
	GENERAL_ERROR = 'GENERAL_ERROR',
	/** 清空Error */
	CLEAN_ERROR = 'CLEAN_ERROR',
}

// add product tp cart
export enum ADD_PRODUCT_TO_CART_ACTION {
	/** 開始將商品加入購物車 */
	ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART',
	/** 成功將商品加入購物車 */
	ADD_PRODUCT_TO_CART_SUCCESS = 'ADD_PRODUCT_TO_CART_SUCCESS',
	/** 無法將商品加入購物車 */
	ADD_PRODUCT_TO_CART_FAILURE = 'ADD_PRODUCT_TO_CART_FAILURE',
	/** 清空加入購物車的狀態 */
	ADD_PRODUCT_TO_CART_RESET = 'ADD_PRODUCT_TO_CART_RESET',
}
