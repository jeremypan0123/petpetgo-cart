import * as React from 'react';

import * as types from '../../constants/ActionTypes';
import { queryProductsById } from '../../helpers/queryProductsById';

const queryProductsReducer = (state, action) => {
  switch (action.type) {
    case types.QUERY_PRODUCT_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.QUERY_PRODUCT_SUCCESS:
      return {
        products: action.payload,
        loading: false,
        error: null,
      };
    case types.QUERY_PRODUCT_FAILURE:
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

// ids should be array or a integer value
// Return product array if ids is array, otherwise, return a product object
const useQueryProductsById = (cart) => {
  const [state, dispatch] = React.useReducer(
    queryProductsReducer,
    initialState,
  );

  React.useEffect(() => {
    let didCancel = false;

    async function queryProducts() {
      dispatch({ type: types.QUERY_PRODUCT_START });

      try {
        const products = await queryProductsById(
          cart.items.map((item) => item.id),
        );
        if (!didCancel) {
          dispatch({ type: types.QUERY_PRODUCT_SUCCESS, payload: products });
        }
      } catch (err) {
        dispatch({
          type: types.QUERY_PRODUCT_FAILURE,
          payload: { message: err },
        });
      }
    }
    queryProducts();

    return () => {
      didCancel = true;
    };
  }, [cart]);

  return state;
};

export default useQueryProductsById;
