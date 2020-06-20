import * as React from 'react';

import { Spinner } from '@blueprintjs/core';

import { GlobalContext } from '../../contexts';
import Product from '../Product';

const ProductList = (props) => {
  const {
    state: {
      products: { products, loading, error },
    },
  } = React.useContext(GlobalContext);

  if (loading) return <Spinner />;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </>
  );
};

export default ProductList;
