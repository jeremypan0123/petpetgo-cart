import * as React from 'react';
import useRootReducer from 'use-root-reducer';

import { cartReducer, productReducer, errorReducer } from '../reducers';
import useLocalStorage from '../hooks/useLocalStorage';
import { queryProductsById } from '../helpers/queryProductsById';
import * as types from '../constants/ActionTypes';
import { createMockProducts } from '../helpers/createMockData';

export const GlobalContext = React.createContext(null);

export default function GlobalContextProvider(props) {
  const { children } = props;

  // Retrieve cart data from local storage
  const [cartInLocalStorage, setCartInLocalStorage] = useLocalStorage('cart', {
    items: [],
  });

  const initialProductState = {
    products: [],
    loading: false,
    error: null,
  };

  const [addToCart, setAddToCart] = React.useState(null);

  // combine multiple reducers into one root reducer
  const [state, dispatch] = useRootReducer({
    cart: React.useReducer(cartReducer, cartInLocalStorage),
    products: React.useReducer(productReducer, initialProductState),
    error: React.useReducer(errorReducer, null),
  });

  // add product to cart
  React.useEffect(() => {
    async function syncProductsInfo() {
      dispatch({
        type: types.DISABLE_CHANGE_AMOUNT,
        payload: { id: addToCart.id },
      });
      // retrieve the latest information of products in cart
      const latestProductsInfo = await queryProductsById(addToCart.id);
      dispatch({
        type: types.ADD_ITEM,
        payload: addToCart,
      });
      dispatch({
        type: types.ENABLE_CHANGE_AMOUNT,
        payload: { id: addToCart.id },
      });
    }
    // sync the latest product information
    if (addToCart) syncProductsInfo();
  }, [addToCart]);

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

  // fetch products
  React.useEffect(() => {
    let didCancel = false;

    async function fetchProducts() {
      dispatch({ type: types.FETCH_PRODUCT_START });

      try {
        const products = await createMockProducts();
        if (!didCancel) {
          dispatch({ type: types.FETCH_PRODUCT_SUCCESS, payload: products });
        }
      } catch (err) {
        dispatch({
          type: types.FETCH_PRODUCT_FAILURE,
          payload: { message: err },
        });
      }
    }
    fetchProducts();

    return () => {
      didCancel = true;
    };
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch, setAddToCart }}>
      {children}
    </GlobalContext.Provider>
  );
}
