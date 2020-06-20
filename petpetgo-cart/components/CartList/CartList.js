import * as React from 'react';

import styled from 'styled-components';

import CartItem from '../CartItem';
import { GlobalContext } from '../../contexts';
import * as types from '../../constants/ActionTypes';

const CartList = (props) => {
  const { state, dispatch } = React.useContext(GlobalContext);
  const {
    cart: { items },
    disableChangeAmount,
  } = state;

  // set 500ms timer for changes amount
  const timerRef = React.useRef(null);

  const onChange = () => {
    // if user change amount in 500ms, reset the timer
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      timerRef.current = null;

      dispatch({ type: types.DO_SOMETHING_ASYNC });
    }, 500);
  };

  return (
    <>
      {items.map((item) => (
        <CartItem
          item={item}
          key={item.id}
          onChange={onChange}
          disableChangeAmount={disableChangeAmount}
        />
      ))}
    </>
  );
};

const StyledSpinnerWrapper = styled.div`
  z-index: 9999;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: fiex;
  justify-content: center;
  align-items: center;
  background: grey;
  opacity: 0.5;
`;

export default CartList;
