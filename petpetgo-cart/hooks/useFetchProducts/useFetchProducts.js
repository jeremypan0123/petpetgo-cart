import * as React from 'react';

import * as types from '../../constants/ActionTypes';
import { createMockProducts } from '../../helpers/createMockData';

const fetchProductsReducer = (state, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCT_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.FETCH_PRODUCT_SUCCESS:
      return {
        products: action.payload,
        loading: false,
        error: null,
      };
    case types.FETCH_PRODUCT_FAILURE:
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

const useFetchProducts = (option = {}) => {
  const [state, dispatch] = React.useReducer(
    fetchProductsReducer,
    initialState,
  );

  React.useEffect(async () => {
    dispatch({ type: types.FETCH_PRODUCT_START });

    try {
      const products = await createMockProducts();
      dispatch({ type: types.FETCH_PRODUCT_SUCCESS, payload: products });
    } catch (err) {
      dispatch({
        type: types.FETCH_PRODUCT_FAILURE,
        payload: { message: err },
      });
    }
  }, []);
  console.log('hooks state: ', state);

  return state;
};

export default useFetchProducts;
