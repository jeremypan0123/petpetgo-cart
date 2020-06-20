import * as React from 'react';

import CartItem from '../CartItem';
import { GlobalContext } from '../../contexts';

const CartList = (props) => {
  const { state } = React.useContext(GlobalContext);
  const {
    cart: { items },
  } = state;

  return (
    <>
      {items.map((item) => (
        <CartItem item={item} key={item.id} />
      ))}
    </>
  );
};

export default CartList;
