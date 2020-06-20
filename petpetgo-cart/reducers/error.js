import * as React from 'react';

import * as types from '../constants/ActionTypes';

export default function errorReducer(state, action) {
  switch (action.type) {
    case types.GENERAL_ERROR:
      return {
        code: action.payload?.code || null,
        message: action.payload?.message || '',
      };
    case types.CLEAN_ERROR:
      return null;

    default:
      return state;
  }
}
