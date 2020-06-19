import * as React from 'react';
import PropTypes from 'prop-types';

import { Button, Card, Elevation } from '@blueprintjs/core';
import styled from 'styled-components';

import { GlobalContext } from '../../contexts';
import * as types from '../../constants/ActionTypes';
import { fetchProductById } from '../../helpers/fetchProductById';

const Product = (props) => {
  const {
    product: { id, name, images, amount, price },
    disableAmount,
    ...rest
  } = props;

  const { dispatch } = React.useContext(GlobalContext);

  const [amountDisabled, setAmountDisabled] = React.useState(false);
  const [purchaseAmount, setPurchaseAmount] = React.useState(1);

  const addProductToCart = async (id, purchaseAmount) => {
    setAmountDisabled(true);
    try {
      const product = await fetchProductById(id);
      product.purchaseAmount = purchaseAmount;
      dispatch({ type: types.ADD_ITEM, payload: product });
    } catch (err) {
      dispatch({ type: types.GENERAL_ERROR, payload: { message: err } });
    } finally {
      setAmountDisabled(false);
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
        <p>{name}</p>
      </h5>
      {images.map((image) => (
        <StyledProductImage src={image} alt={name} key={image} />
      ))}
      <h6>
        <Button
          onClick={decreaseAmount}
          disabled={amountDisabled || purchaseAmount === 1}
        >
          -
        </Button>{' '}
        {purchaseAmount}
        <Button
          onClick={increaseAmount}
          disabled={amountDisabled || purchaseAmount === amount}
        >
          +
        </Button>
      </h6>
      <p>amount: {amount}</p>
      <p>price: {price}</p>
      <Button
        onClick={() => addProductToCart(id, purchaseAmount)}
        disabled={amountDisabled}
      >
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
