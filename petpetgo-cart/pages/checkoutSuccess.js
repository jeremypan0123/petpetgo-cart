import * as React from 'react';
import Head from 'next/head';

import { getLayout } from '../layouts/Visitor';

const CheckoutSuccessPage = () => {
  return (
    <>
      <Head>
        <title>Petpetgo - 結帳完成</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p>結帳完成</p>
    </>
  );
};

CheckoutSuccessPage.getLayout = getLayout;

export default CheckoutSuccessPage;
