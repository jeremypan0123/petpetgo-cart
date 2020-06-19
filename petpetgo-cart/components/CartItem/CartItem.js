import * as React from 'react';
import PropTypes from 'prop-types';

import { Button, Card, Elevation } from '@blueprintjs/core';
import styled from 'styled-components';

import { GlobalContext } from '../../contexts';
import * as types from '../../Constants/ActionTypes';

const CartItem = (props) => {
  const {
    item: { id, name, images, amount, purchaseAmount, price },
    ...rest
  } = props;

  const { dispatch } = React.useContext(GlobalContext);

  const increaseAmount = () => {
    dispatch({ type: types.ADJUST_ITEM_AMOUNT, payload: { id: id, count: 1 } });
  };

  const decreaseAmount = () => {
    dispatch({
      type: types.ADJUST_ITEM_AMOUNT,
      payload: { id: id, count: -1 },
    });
  };

  const deleteItem = () => {
    dispatch({
      type: types.DELETE_ITEM,
      payload: { id: id },
    });
  };

  return (
    <Card interactive={false} elevation={Elevation.TWO} {...rest}>
      <h5>
        <p>{name}</p>
      </h5>
      {images.map((image) => (
        <StyledProductImage src={image} alt={name} />
      ))}
      <h6>
        <Button onClick={decreaseAmount}>-</Button> {purchaseAmount}
        <Button onClick={increaseAmount}>+</Button>
        <Button onClick={deleteItem}>Delete</Button>
      </h6>
      <h6>total: {amount}</h6>
      <p>price: {price * purchaseAmount}</p>
    </Card>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};

const StyledProductImage = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  background: url(${(props) => props.src}) no-repeat;
  background-size: 48px 48px;
  box-sizing: border-box;
  padding: 1px;
`;

export default CartItem;