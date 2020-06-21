import * as React from 'react';
import useRootReducer from 'use-root-reducer';

import {
  cartReducer,
  errorReducer,
  disableChangeAmountReducer,
  addProductToCartReducer,
} from '../reducers';
import useLocalStorage from '../hooks/useLocalStorage';
import { doSomethingAsync } from '../helpers/doSomethingAsync';
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
    disableChangeAmount: React.useReducer(disableChangeAmountReducer, false),
    addProductToCart: React.useReducer(addProductToCartReducer, {
      product: null,
      checking: false,
      error: null,
    }),
  });

  // Change amount in cart handler
  React.useEffect(() => {
    async function doSomething() {
      await doSomethingAsync();
      dispatch({ type: types.DO_SOMETHING_ASYNC_SUCCESS });
      setCartInLocalStorage({
        ...state.cart,
      });
    }

    if (state.disableChangeAmount) {
      doSomething();
    }
  }, [state.disableChangeAmount]);

  // Add Product to cart handler
  React.useEffect(() => {
    let didCancel = false;
    async function doSomething() {
      try {
        // find the purchaseAmount in cart
        const itemInCart = state.cart.items.find(
          (item) => item.id === state.addProductToCart.product.id,
        );
        const purchaseAmountInCart = itemInCart ? itemInCart.purchaseAmount : 0;
        let correctPurchaseAmount =
          state.addProductToCart.product.purchaseAmount;
        // check the purchaseAmount + the purchaseAmount in cart is greater than amount or not
        if (
          state.addProductToCart.product.purchaseAmount + purchaseAmountInCart >
          state.addProductToCart.product.amount
        ) {
          correctPurchaseAmount =
            state.addProductToCart.product.amount - purchaseAmountInCart;
        }

        await doSomethingAsync(500);
        if (!didCancel) {
          dispatch({
            type: types.ADD_ITEM,
            payload: {
              product: {
                ...state.addProductToCart.product,
                purchaseAmount: correctPurchaseAmount,
              },
            },
          });
          dispatch({
            type: types.ADD_PRODUCT_TO_CART_SUCCESS,
            payload: {
              product: state.addProductToCart.product,
            },
          });
        }
      } catch (error) {
        dispatch({
          type: types.ADD_PRODUCT_TO_CART_FAILURE,
          payload: { product: state.addProductToCart.product, error },
        });
      }
    }

    if (state.addProductToCart.checking) {
      doSomething();
    }

    return () => {
      didCancel = true;
    };
  }, [state.addProductToCart]);

  // real time sync the latest information of product when the cart is updated
  // React.useEffect(() => {
  //   async function syncProductsInfo() {
  //     dispatch({ type: types.SYNC_PRODUCTS_INFO_START });

  //     try {
  //       // retrieve the latest information of products in cart
  //       const latestProductsInfo = await queryProductsById(
  //         state.cart.items.map((item) => item.id),
  //       );
  //       let newItems = [];
  //       state.cart.items.map((item) => {
  //         // find the latest corresponding product info by the product id in cart
  //         const productInfo = latestProductsInfo.find(
  //           (latestProductInfo) => latestProductInfo.id === item.id,
  //         );
  //         // if the information of product exists, update the product in cart.
  //         // otherwise, remove it in cart
  //         if (productInfo) {
  //           newItems.push({
  //             ...item,
  //             ...productInfo,
  //           });
  //         }
  //       });
  //       // To avoid entering this effect again, update the state.cart.items in global context without creating new state.cart object.
  //       dispatch({
  //         type: types.SYNC_PRODUCTS_INFO_SUCCESS,
  //         payload: { items: newItems },
  //       });
  //       // set carts into local storage
  //       setCartInLocalStorage({
  //         ...state.cart,
  //         items: newItems,
  //       });
  //     } catch (error) {
  //       dispatch({
  //         type: types.SYNC_PRODUCTS_INFO_FAILURE,
  //         payload: { message: err },
  //       });
  //     }
  //   }
  //   // sync the latest product information
  //   syncProductsInfo();
  // }, [state.cart]);

  // set cart in local storage if state.cart is changed
  React.useEffect(() => {
    setCartInLocalStorage({
      ...state.cart,
    });
  }, [state.cart]);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
