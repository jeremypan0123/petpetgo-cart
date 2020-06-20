import * as React from 'react';

import { Spinner } from '@blueprintjs/core';

import Product from '../Product';
import useFetchProducts from '../../hooks/useFetchProducts';

const ProductList = (props) => {
  const { products, loading, error } = useFetchProducts();

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
