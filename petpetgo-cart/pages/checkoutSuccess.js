import * as React from 'react';
import Head from 'next/head';

import { getLayout } from '../layouts/Visitor';

const CartPage = () => {
  return (
    <>
      <Head>
        <title>Petpetgo - Checkout Success</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p>Checkout Success</p>
    </>
  );
};

CartPage.getLayout = getLayout;

export default CartPage;
