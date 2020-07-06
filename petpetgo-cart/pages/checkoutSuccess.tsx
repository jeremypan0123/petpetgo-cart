import * as React from 'react';
import Head from 'next/head';

import { getLayout } from '../layouts/Visitor';
import { GlobalContext } from '../contexts';
import * as types from '../constants/ActionTypes';

const CheckoutSuccessPage = () => {
  const { dispatch } = React.useContext(GlobalContext);

  React.useEffect(() => {
    dispatch({ type: types.CLEAR_CART });
  }, []);

  return (
    <>
      <Head>
        <title>Petpetgo - 結帳完成</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h4 className="bp3-heading">結帳完成</h4>
    </>
  );
};

CheckoutSuccessPage.getLayout = getLayout;

export default CheckoutSuccessPage;
