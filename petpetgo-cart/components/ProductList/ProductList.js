import * as React from 'react';

import { Spinner } from '@blueprintjs/core';

import useFetchProducts from '../../hooks/useFetchProducts/';
import Product from '../Product';

const ProductList = (props) => {
  const { products, loading, error } = useFetchProducts();
  console.log(products);
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
