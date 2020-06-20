import * as React from 'react';

import * as types from '../constantss/ActionTypes';

// the state of cart should be:
// {
//   items: [
//     {
//       id, // product id
//       purchaseAmount,  // the amount of the user want to purchase
//     },
//     ...
//   ],
// }
export default function productReducer(state, action) {
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
    case types.DISABLE_CHANGE_AMOUNT:
      state.products.find(
        (product) => product.id === action.payload.id,
      ).disableChangeAmount = true;
      return { ...state };
    case types.ENABLE_CHANGE_AMOUNT:
      state.products.find(
        (product) => product.id === action.payload.id,
      ).disableChangeAmount = false;
      return { ...state };
    default:
      return state;
  }
}
