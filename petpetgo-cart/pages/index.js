import Head from 'next/head';

import { Position, Toast, Toaster } from '@blueprintjs/core';

import ProductList from '../components/ProductList';
import { getLayout } from '../layouts/Visitor';
import { GlobalContext } from '../contexts';
import * as types from '../constants/ActionTypes';
export default function Home() {
  const {
    state: { addProductToCart },
    dispatch,
  } = React.useContext(GlobalContext);

  let addProductToCartStatusToast = null;

  // is checking
  if (addProductToCart.checking) {
    console.log('addProductToCart is checking...');
  }
  // error
  if (addProductToCart.error) {
    console.log('something went wrong...');
  }
  // success
  if (
    addProductToCart.product &&
    !addProductToCart.checking &&
    !addProductToCart.error
  ) {
    console.log('addProductToCart success!!!');
  }

  // To avoid keeping prompting add cart success toast, reset the addProductToCart when unmounting
  React.useEffect(() => {
    return () => {
      dispatch({ type: types.ADD_PRODUCT_TO_CART_RESET });
    };
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Petpetgo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>商品</p>
        <ProductList />
      </main>
      {addProductToCartStatusToast}
    </div>
  );
}

Home.getLayout = getLayout;
