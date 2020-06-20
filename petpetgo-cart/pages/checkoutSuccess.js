import * as React from 'react';
import Head from 'next/head';

import { getLayout } from '../layouts/Visitor';

const CheckoutSuccessPage = () => {
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

CheckoutSuccessPage.getLayout = getLayout;

export default CheckoutSuccessPage;
