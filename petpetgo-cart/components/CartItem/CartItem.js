import * as React from 'react';
import PropTypes from 'prop-types';

import { Button, Card, Elevation } from '@blueprintjs/core';

const CartItem = (props) => {
  const {
    item: { name, images, amount, selectedAmount, price },
    ...rest
  } = props;
  return (
    <Card interactive={false} elevation={Elevation.TWO} {...rest}>
      <h5>
        <p>{name}</p>
      </h5>
      {images.map((image) => (
        <img src={image} alt={name} />
      ))}
      <h6>
        <Button>-</Button> {selectedAmount}
        <Button>+</Button>
      </h6>
      <h6>total: {amount}</h6>
      <p>price: {price}</p>
    </Card>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CartItem;
