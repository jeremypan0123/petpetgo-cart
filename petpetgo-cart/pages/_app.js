import * as React from 'react';

import { GlobalContextProvider } from '../contexts';

const MyApp = (props) => {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <GlobalContextProvider>
      {getLayout(<Component {...pageProps} />)}
    </GlobalContextProvider>
  );
};

export default MyApp;
