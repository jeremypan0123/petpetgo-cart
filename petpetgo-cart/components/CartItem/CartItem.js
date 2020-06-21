import * as React from 'react';
import PropTypes from 'prop-types';

import { Button, Card, Elevation, Alert, Dialog } from '@blueprintjs/core';
import styled from 'styled-components';

import { GlobalContext } from '../../contexts';
import * as types from '../../constants/ActionTypes';

const CartItem = (props) => {
  const {
    item: { id, name, images, amount, purchaseAmount, price },
    onAmountChange,
    ...rest
  } = props;

  const [deleteAlertOpen, setDeleteAlertOpen] = React.useState(false);
  const [imageDialog, setImageDialog] = React.useState(null);

  const openImageDialog = (image) => {
    setImageDialog(image);
  };

  const closeImageDialog = () => {
    setImageDialog(null);
  };

  const openDeleteAlert = () => {
    setDeleteAlertOpen(true);
  };
  const closeDeleteAlert = () => {
    setDeleteAlertOpen(false);
  };

  const { state, dispatch } = React.useContext(GlobalContext);
  const { disableChangeAmount } = state;

  const increaseAmount = () => {
    dispatch({
      type: types.ADJUST_ITEM_AMOUNT,
      payload: { id: id, count: 1 },
    });
    if (onAmountChange) onAmountChange();
  };

  const decreaseAmount = () => {
    if (purchaseAmount === 1) {
      openDeleteAlert();
    } else {
      dispatch({
        type: types.ADJUST_ITEM_AMOUNT,
        payload: { id: id, count: -1 },
      });
      if (onAmountChange) onAmountChange();
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
        <h4 className="bp3-heading">{name}</h4>
        <StyledImageContainer>
          {images.map((image, index) => (
            <StyledProductImageWrapper
              src={image}
              alt={name}
              key={image}
              onClick={() => openImageDialog(image)}
            />
          ))}

          <StyledImageDialogWrapper
            isOpen={Boolean(imageDialog)}
            onClose={closeImageDialog}
            title={name}
          >
            <StyledZoomInImageWrapper src={imageDialog} />
          </StyledImageDialogWrapper>
        </StyledImageContainer>

        <StyledBottomContainer>
          <StyledDelete>
            <StyledPurchaseAmountContainer>
              <StyledPurchaseAmountButton
                onClick={decreaseAmount}
                disabled={disableChangeAmount}
              >
                -
              </StyledPurchaseAmountButton>
              <b>{purchaseAmount}</b>
              <StyledPurchaseAmountButton
                onClick={increaseAmount}
                disabled={disableChangeAmount || purchaseAmount === amount}
              >
                +
              </StyledPurchaseAmountButton>
            </StyledPurchaseAmountContainer>
            <StyledDeleteButton
              onClick={openDeleteAlert}
              disabled={disableChangeAmount}
              className="bp3-outlined"
              icon="trash"
              text="刪除"
            />
          </StyledDelete>
          <StyledAmountAndPrice>
            <div className="bp3-running-text">
              <div className="bp3-text-large">
                <>商品數量: {amount}</>
              </div>
              <div className="bp3-text-large">
                <>商品價錢: {price * purchaseAmount}</>
              </div>
            </div>
          </StyledAmountAndPrice>
        </StyledBottomContainer>
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
  onAmountChange: PropTypes.func,
};

const StyledImageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  no-wrap: wrap;
`;

const StyledProductImageWrapper = styled.div`
  width: 50px;
  height: 50px;
  background: url(${(props) => props.src}) no-repeat;
  background-size: 48px 48px;
  box-sizing: border-box;
  margin-left: 5px;
`;

const StyledImageDialogWrapper = styled(Dialog)`
  width: 100%;
  height: 100%;
`;

const StyledZoomInImageWrapper = styled.img`
  margin-top: 1em;
  border-radius: 20px;
`;

const StyledBottomContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  wrap: nowrap;
  margin-top: 1em;
`;

const StyledDelete = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const StyledAmountAndPrice = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  text-align: left;
`;

const StyledPurchaseAmountContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

const StyledDeleteButton = styled(Button)`
  width: 100%;
  margin-top: 1em;
`;

const StyledPurchaseAmountButton = styled(Button)`
  border-radius: 50%;
`;

export default CartItem;
