import * as React from 'react';
import Head from 'next/head';

import { getLayout } from '../layouts/Visitor';
import CartItem from '../components/CartItem';
import Product from '../components/Product';
import { createMockProducts } from '../helpers/createMockData';
import { GlobalContext } from '../contexts';

const CartPage = () => {
  const { state, dispatch } = React.useContext(GlobalContext);
  // Extract the state of cart
  const { cart } = state;
  const [products, setProducts] = React.useState([]);

  // const cartItems = createMockCartItems(2);

  React.useEffect(() => {
    setProducts(createMockProducts(5));
  }, []);

  return (
    <>
      <Head>
        <title>Petpetgo - Cart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p>Cart Items</p>
      {cart.items.map((cartIten) => (
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
