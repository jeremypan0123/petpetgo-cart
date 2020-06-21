import * as React from 'react';
import PropTypes from 'prop-types';

import { Button, Card, Elevation, Dialog } from '@blueprintjs/core';
import styled from 'styled-components';

import { GlobalContext } from '../../contexts';
import * as types from '../../constants/ActionTypes';

const Product = (props) => {
  const { product, ...rest } = props;

  const {
    state: { addProductToCart },
    dispatch,
  } = React.useContext(GlobalContext);

  const [purchaseAmount, setPurchaseAmount] = React.useState(1);
  const [imageDialog, setImageDialog] = React.useState(null);

  const openImageDialog = (image) => {
    setImageDialog(image);
  };

  const closeImageDialog = () => {
    setImageDialog(null);
  };

  const addProductToCartFunc = () => {
    dispatch({
      type: types.ADD_PRODUCT_TO_CART,
      payload: { product: { ...product, purchaseAmount } },
    });
  };

  const increaseAmount = () => {
    setPurchaseAmount((prev) => prev + 1);
  };

  const decreaseAmount = () => {
    setPurchaseAmount((prev) => prev - 1);
  };

  return (
    <Card interactive={false} elevation={Elevation.TWO} {...rest}>
      <h4 className="bp3-heading">{product.name}</h4>
      <StyledImageContainer>
        {product.images.map((image, index) => (
          <StyledProductImageWrapper
            src={image}
            alt={product.name}
            key={image}
            onClick={() => openImageDialog(image)}
          />
        ))}
      </StyledImageContainer>

      <StyledImageDialogWrapper
        isOpen={Boolean(imageDialog)}
        onClose={closeImageDialog}
        title={product.name}
      >
        <StyledZoomInImageWrapper src={imageDialog} />
      </StyledImageDialogWrapper>

      <StyledBottomContainer>
        <StyledAddToCart>
          <StyledPurchaseAmountContainer>
            <StyledPurchaseAmountButton
              onClick={decreaseAmount}
              disabled={
                (addProductToCart.checking &&
                  addProductToCart.product.id === product.id) ||
                purchaseAmount === 1
              }
            >
              -
            </StyledPurchaseAmountButton>{' '}
            <b>{purchaseAmount}</b>
            <StyledPurchaseAmountButton
              onClick={increaseAmount}
              disabled={
                (addProductToCart.checking &&
                  addProductToCart.product.id === product.id) ||
                purchaseAmount === product.amount
              }
            >
              +
            </StyledPurchaseAmountButton>
          </StyledPurchaseAmountContainer>

          <StyledAddToCartButton
            onClick={addProductToCartFunc}
            disabled={
              addProductToCart.checking &&
              addProductToCart.product.id === product.id
            }
            className="bp3-outlined"
            icon="add"
            text="加入購物車"
          />
        </StyledAddToCart>
        <StyledAmountAndPrice>
          <div className="bp3-running-text">
            <div className="bp3-text-large">
              <>商品數量: {product.amount}</>
            </div>
            <div className="bp3-text-large">
              <>商品價錢: {product.price * purchaseAmount}</>
            </div>
          </div>
        </StyledAmountAndPrice>
      </StyledBottomContainer>
    </Card>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
};

const StyledCard = styled(Card)`
  transition: all 450ms ease 0s;
`;

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

const StyledAddToCart = styled.div`
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

const StyledAddToCartButton = styled(Button)`
  width: 100%;
  margin-top: 1em;
`;

const StyledPurchaseAmountButton = styled(Button)`
  border-radius: 50%;
`;

export default Product;
