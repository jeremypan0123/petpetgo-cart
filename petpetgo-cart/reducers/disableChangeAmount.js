import * as React from 'react';

import * as types from '../constants/ActionTypes';

export default function disableChangeAmountReducer(state, action) {
  switch (action.type) {
    case types.DO_SOMETHING_ASYNC:
      return true;
    case types.DO_SOMETHING_ASYNC_SUCCESS:
      return false;
    default:
      return state;
  }
}
