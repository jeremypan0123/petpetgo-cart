import * as React from 'react';
import PropTypes from 'prop-types';

import { Button, Card, Elevation } from '@blueprintjs/core';
import styled from 'styled-components';

import { GlobalContext } from '../../contexts';
import * as types from '../../constants/ActionTypes';

const Product = (props) => {
  const { product, ...rest } = props;

  const { dispatch, setAddToCart } = React.useContext(GlobalContext);

  const [purchaseAmount, setPurchaseAmount] = React.useState(1);

  const addProductToCart = () => {
    try {
      setAddToCart({ ...product, purchaseAmount });
    } catch (err) {
      dispatch({ type: types.GENERAL_ERROR, payload: { message: err } });
    }
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
      <p>amount: {product.amount}</p>
      <p>price: {product.price}</p>
      <Button onClick={addProductToCart} disabled={product.disableChangeAmount}>
        Add to cart
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
