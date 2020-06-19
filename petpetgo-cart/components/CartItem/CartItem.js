import * as React from 'react';
import PropTypes from 'prop-types';

import { Button, Card, Elevation, Alert } from '@blueprintjs/core';
import styled from 'styled-components';

import { GlobalContext } from '../../contexts';
import * as types from '../../constants/ActionTypes';

const CartItem = (props) => {
  const {
    item: { id, name, images, amount, purchaseAmount, price },
    ...rest
  } = props;

  const [deleteAlertOpen, setDeleteAlertOpen] = React.useState(false);
  const openDeleteAlert = () => {
    setDeleteAlertOpen(true);
  };
  const closeDeleteAlert = () => {
    setDeleteAlertOpen(false);
  };

  const { dispatch } = React.useContext(GlobalContext);

  const increaseAmount = () => {
    dispatch({ type: types.ADJUST_ITEM_AMOUNT, payload: { id: id, count: 1 } });
  };

  const decreaseAmount = () => {
    if (purchaseAmount === 1) {
      openDeleteAlert();
    } else {
      dispatch({
        type: types.ADJUST_ITEM_AMOUNT,
        payload: { id: id, count: -1 },
      });
    }
  };

  const deleteItem = () => {
    dispatch({
      type: types.DELETE_ITEM,
      payload: { id: id },
    });
  };

  return (
    <>
      <Card interactive={false} elevation={Elevation.TWO} {...rest}>
        <h5>
          <p>{name}</p>
        </h5>
        {images.map((image) => (
          <StyledProductImage src={image} alt={name} key={image} />
        ))}
        <h6>
          <Button onClick={decreaseAmount}>-</Button> {purchaseAmount}
          <Button onClick={increaseAmount} disabled={purchaseAmount === amount}>
            +
          </Button>
          <Button onClick={openDeleteAlert}>Delete</Button>
        </h6>
        <p>amount: {amount}</p>
        <p>price: {price * purchaseAmount}</p>
      </Card>

      <Alert
        isOpen={deleteAlertOpen}
        canOutsideClickCancel={true}
        onClose={closeDeleteAlert}
        onConfirm={deleteItem}
        cancelButtonText="Cancel"
        confirmButtonText="Delete"
      >
        {`Are you sure you want to delete ${name} ?`}
      </Alert>
    </>
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
