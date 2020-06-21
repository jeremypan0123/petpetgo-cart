import * as React from 'react';
import PropTypes from 'prop-types';

import { Button, Card, Elevation, Toast } from '@blueprintjs/core';
import styled from 'styled-components';

import { GlobalContext } from '../../contexts';
import * as types from '../../constants/ActionTypes';

const Product = (props) => {
  const { product, ...rest } = props;

  const { dispatch } = React.useContext(GlobalContext);

  const [purchaseAmount, setPurchaseAmount] = React.useState(1);

  const addProductToCart = () => {
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
      <h5>
        <p>{product.name}</p>
      </h5>
      {product.images.map((image) => (
        <StyledProductImage src={image} alt={name} key={image} />
      ))}
      <h6>
        <Button
          onClick={decreaseAmount}
          disabled={product.disableChangeAmount || purchaseAmount === 1}
        >
          -
        </Button>{' '}
        {purchaseAmount}
        <Button
          onClick={increaseAmount}
          disabled={
            product.disableChangeAmount || purchaseAmount === product.amount
          }
        >
          +
        </Button>
      </h6>
      <p>商品數量: {product.amount}</p>
      <p>商品價錢: {product.price}</p>
      <Button onClick={addProductToCart} disabled={product.disableChangeAmount}>
        加入購物車
      </Button>
    </Card>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
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

export default Product;
