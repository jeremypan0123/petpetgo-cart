import * as React from 'react';

const MyApp = (props) => {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout || ((page) => page);
  return <>{getLayout(<Component {...pageProps} />)}</>;
};

export default MyApp;
