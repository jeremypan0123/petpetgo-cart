import * as React from 'react';
import Head from 'next/head';

import { getLayout } from '../layouts/Visitor';
import CartItem from '../components/CartItem';
import Product from '../components/Product';
import {
  createMockProducts,
  createMockCartItems,
} from '../helpers/createMockData';

const CartPage = () => {
  const products = createMockProducts(5);
  const cartItems = createMockCartItems(2);

  return (
    <>
      <Head>
        <title>Petpetgo - Cart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p>Cart Items</p>
      {cartItems.map((cartIten) => (
        <CartItem item={cartIten} key={cartIten.id} />
      ))}

      <p>Products</p>
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </>
  );
};

CartPage.getLayout = getLayout;

export default CartPage;
