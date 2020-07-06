import * as React from 'react';

import styled from 'styled-components';

import CartItem from '../CartItem';
import { GlobalContext } from '../../contexts';
import * as types from '../../constants/ActionTypes';

const CartList = (props) => {
  const { state, dispatch } = React.useContext(GlobalContext);
  const {
    cart: { items },
  } = state;

  // set 500ms timer for changes amount
  const timerRef = React.useRef(null);

  const onAmountChange = (): void => {
    // if user change amount in 500ms, reset the timer
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      timerRef.current = null;

      dispatch({ type: types.DO_SOMETHING_ASYNC });
    }, 500);
  };

  if (!items || items.length === 0) {
    return <h4 className="bp3-heading">目前沒有商品在購物車中...</h4>;
  }

  return (
    <StyledCartContainer>
      {items.map((item) => (
        <StyledCartWrapper key={item.id}>
          <CartItem item={item} onAmountChange={onAmountChange} />
        </StyledCartWrapper>
      ))}
    </StyledCartContainer>
  );
};

const StyledCartContainer = styled.div`
  margin: 1em 0;
`;

const StyledCartWrapper = styled.div`
  margin: 0.5em 0;
`;

export default CartList;
