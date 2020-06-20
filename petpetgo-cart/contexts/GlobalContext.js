import * as React from 'react';
import useRootReducer from 'use-root-reducer';

import { cartReducer, errorReducer } from '../reducers';
import useLocalStorage from '../hooks/useLocalStorage';
import { queryProductsById } from '../helpers/queryProductsById';
import * as types from '../constants/ActionTypes';

export const GlobalContext = React.createContext(null);

export default function GlobalContextProvider(props) {
  const { children } = props;

  // Retrieve cart data from local storage
  const [cartInLocalStorage, setCartInLocalStorage] = useLocalStorage('cart', {
    items: [],
  });

  // combine multiple reducers into one root reducer
  const [state, dispatch] = useRootReducer({
    cart: React.useReducer(cartReducer, cartInLocalStorage),
    error: React.useReducer(errorReducer, null),
  });

  // real time sync the latest information of product when the cart is updated
  React.useEffect(() => {
    async function syncProductsInfo() {
      // retrieve the latest information of products in cart
      const latestProductsInfo = await queryProductsById(
        state.cart.items.map((item) => item.id),
      );

      let newItems = [];
      state.cart.items.map((item) => {
        // find the latest corresponding product info by the product id in cart
        const productInfo = latestProductsInfo.find(
          (latestProductInfo) => latestProductInfo.id === item.id,
        );
        // if the information of product exists, update the product in cart.
        // otherwise, remove it in cart
        if (productInfo) {
          newItems.push({
            ...item,
            ...productInfo,
          });
        }
      });
      // To avoid entering this effect again, update the state.cart.items in global context without creating new state.cart object.
      dispatch({ type: types.SYNC_PRODUCTS_INFO, payload: newItems });
      // set carts into local storage
      setCartInLocalStorage({
        ...state.cart,
        items: newItems,
      });
    }
    // sync the latest product information
    syncProductsInfo();
  }, [state.cart]);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
