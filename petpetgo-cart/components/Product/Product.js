import * as React from 'react';
import PropTypes from 'prop-types';

import { Button, Card, Elevation } from '@blueprintjs/core';

import { GlobalContext } from '../../contexts';
import * as types from '../../Constants/ActionTypes';
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
    const product = await fetchProductById(id);
    product.purchaseAmount = purchaseAmount;
    dispatch({ type: types.ADD_ITEM, payload: product });
    setAmountDisabled(false);
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
        <img src={image} alt={name} />
      ))}
      <h6>
        <Button onClick={decreaseAmount} disabled={amountDisabled}>
          -
        </Button>{' '}
        {purchaseAmount}
        <Button onClick={increaseAmount} disabled={amountDisabled}>
          +
        </Button>
      </h6>
      <p>amount: {amount}</p>
      <p>price: {price}</p>
      <Button onClick={() => addProductToCart(id, purchaseAmount)}>
        Add to cart
      </Button>
    </Card>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Product;
