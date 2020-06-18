import * as React from 'react';
import PropTypes from 'prop-types';

import { Button, Card, Elevation } from '@blueprintjs/core';

const Product = (props) => {
  const {
    product: { name, images, amount, price },
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
      <p>amount: {amount}</p>
      <p>price: {price}</p>
    </Card>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Product;
