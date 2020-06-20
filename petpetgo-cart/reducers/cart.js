import * as React from 'react';

import * as types from '../constants/ActionTypes';

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
export default function cartReducer(state, action) {
  let newState, itemIndex;
  switch (action.type) {
    case types.ADD_ITEM:
      // action should be
      // {
      //   type,
      //   payload: {
      //    id,
      //    purchaseAmount
      //   }
      // }

      // check the product has been added into cart or not
      newState = { ...state };
      itemIndex = newState.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (itemIndex !== -1) {
        newState.items[itemIndex].purchaseAmount +=
          action.payload.purchaseAmount;
      } else {
        newState.items.push({ ...action.payload });
      }
      return newState;
    case types.ADJUST_ITEM_AMOUNT:
      // check the product has been added into cart or not
      newState = { ...state };
      itemIndex = newState.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (itemIndex !== -1) {
        newState.items[itemIndex].purchaseAmount += action.payload.count;
      }
      return newState;
    case types.DELETE_ITEM:
      newState = { ...state };
      itemIndex = newState.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (itemIndex !== -1) {
        newState.items.splice(itemIndex, 1);
      }
      return newState;
    case types.CLEAR_CART:
      return {
        items: [],
      };
    default:
      return state;
  }
}
