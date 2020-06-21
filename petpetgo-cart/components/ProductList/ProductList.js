import * as React from 'react';

import { Spinner } from '@blueprintjs/core';
import styled from 'styled-components';

import Product from '../Product';
import useFetchProducts from '../../hooks/useFetchProducts';

const ProductList = (props) => {
  const { products, loading, error } = useFetchProducts();

  if (loading) return <Spinner />;
  if (error) return <div>{error.message}</div>;

  if (!products || products.length === 0) {
    return <h4 className="bp3-heading">目前沒有商品...</h4>;
  }

  return (
    <StyledProductContainer>
      {products.map((product) => (
        <StyledProductWrapper key={product.id}>
          <Product product={product} />
        </StyledProductWrapper>
      ))}
    </StyledProductContainer>
  );
};

const StyledProductContainer = styled.div`
  margin: 1em 0;
`;

const StyledProductWrapper = styled.div`
  margin: 0.5em 0;
`;

export default ProductList;
