import * as React from 'react';

import { FETCH_PRODUCT_ACTION } from '../../constants/ActionTypes';
import { createMockProducts } from '../../helpers/createMockData';
import { ReducerAction, FetchProductsState } from './interfaces';

const fetchProductsReducer = (
	state: FetchProductsState,
	action: ReducerAction,
): FetchProductsState => {
	switch (action.type) {
		case FETCH_PRODUCT_ACTION.FETCH_PRODUCT_START:
			return {
				...state,
				loading: true,
				error: null,
			};
		case FETCH_PRODUCT_ACTION.FETCH_PRODUCT_SUCCESS:
			return {
				products: action.payload,
				loading: false,
				error: null,
			};
		case FETCH_PRODUCT_ACTION.FETCH_PRODUCT_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

const initialState = {
	products: [],
	loading: false,
	error: null,
};

const useFetchProducts = (): FetchProductsState => {
	const [state, dispatch] = React.useReducer(
		fetchProductsReducer,
		initialState,
	);

	React.useEffect(() => {
		let didCancel = false;

		async function fetchProducts() {
			dispatch({ type: FETCH_PRODUCT_ACTION.FETCH_PRODUCT_START });

			try {
				const products = await createMockProducts();
				if (!didCancel) {
					dispatch({
						type: FETCH_PRODUCT_ACTION.FETCH_PRODUCT_SUCCESS,
						payload: products,
					});
				}
			} catch (err) {
				dispatch({
					type: FETCH_PRODUCT_ACTION.FETCH_PRODUCT_FAILURE,
					payload: { message: err },
				});
			}
		}
		fetchProducts();

		return () => {
			didCancel = true;
		};
	}, []);

	return state;
};

export default useFetchProducts;
