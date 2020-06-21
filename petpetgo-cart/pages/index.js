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

  const toasts = React.useRef([]);
  const toaster = React.useRef(null);
  const refHandlers = React.useRef({
    toaster: (ref) => (toaster.current = ref),
  });

  const addToast = (msg) => {
    toaster.current.show({ message: msg });
  };

  // is checking
  if (addProductToCart.checking) {
    console.log('addProductToCart is checking...');
  }
  // error
  if (addProductToCart.error) {
    addToast(addProductToCart.error);
  }
  // success
  if (
    addProductToCart.product &&
    !addProductToCart.checking &&
    !addProductToCart.error
  ) {
    addToast(`已成功加入 ${addProductToCart.product.name} 至購物車!`);
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

      <Toaster position={Position.TOP} ref={refHandlers.current.toaster}>
        {toasts.current.map((toast) => (
          <Toast {...toast} />
        ))}
      </Toaster>
      {/* {addProductToCartToast} */}
    </div>
  );
}

Home.getLayout = getLayout;
