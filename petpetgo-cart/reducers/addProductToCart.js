import * as React from 'react';

import * as types from '../constants/ActionTypes';

export default function addProductToCart(state, action) {
  switch (action.type) {
    case types.ADD_PRODUCT_TO_CART:
      return {
        product: { ...action.payload.product },
        checking: true,
        error: null,
      };
    case types.ADD_PRODUCT_TO_CART_SUCCESS:
      return {
        product: action.payload.product,
        checking: false,
        error: null,
      };
    case types.ADD_PRODUCT_TO_CART_FAILURE:
      return {
        product: action.payload.product,
        checking: false,
        error: action.payload.error,
      };
    case types.ADD_PRODUCT_TO_CART_RESET:
      return {
        product: null,
        checking: false,
        error: null,
      };
    default:
      return state;
  }
}
