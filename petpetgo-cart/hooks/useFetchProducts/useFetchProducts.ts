import * as React from 'react';

import { FETCH_PRODUCT_ACTION } from '../../constants/ActionTypes';
import { createMockProducts, ProductField } from '../../helpers/createMockData';

type ReducerAction =
  | FetchProductStart
  | FetchProductSuccess
  | FetchProductFailure;

interface Action {
  type: FETCH_PRODUCT_ACTION;
  payload?: unknown;
}

interface FetchProductStart extends Action {
  type: FETCH_PRODUCT_ACTION.FETCH_PRODUCT_START;
}

interface FetchProductSuccess extends Action {
  type: FETCH_PRODUCT_ACTION.FETCH_PRODUCT_SUCCESS;
  payload: ProductField[];
}

interface FetchProductFailure extends Action {
  type: FETCH_PRODUCT_ACTION.FETCH_PRODUCT_FAILURE;
  payload: { message: string };
}

interface FetchProductsState {
  products: ProductField[];
  loading: boolean;
  error: string | null;
}

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
        error: action.payload.message,
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

const useFetchProducts = (
  option: UseFetchProductsOption = {},
): FetchProductsState => {
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

interface UseFetchProductsOption {}

export default useFetchProducts;
