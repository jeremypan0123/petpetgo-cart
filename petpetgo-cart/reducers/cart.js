import * as React from 'react';

import * as types from '../Constants/ActionTypes';

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
  let newState = { ...state };
  const itemIndex = newState.items.findIndex(
    (item) => item.id === action.payload.id,
  );

  switch (action.type) {
    case types.ADD_ITEM:
      console.log('enter add item');
      // action should be
      // {
      //   type,
      //   payload: {
      //    id,
      //    purchaseAmount
      //   }
      // }

      // check the product has been added into cart or not
      if (itemIndex !== -1) {
        newState.items[itemIndex].purchaseAmount +=
          action.payload.purchaseAmount;
      } else {
        newState.items.push({ ...action.payload });
      }
      return newState;
    case types.ADJUST_ITEM_AMOUNT:
      // check the product has been added into cart or not
      if (itemIndex !== -1) {
        newState.items[itemIndex].purchaseAmount += action.payload.count;
      }
      return newState;
    case types.DELETE_ITEM:
      if (itemIndex !== -1) {
        newState.items.splice(itemIndex, 1);
      }
      return newState;
    default:
      return state;
  }
}
