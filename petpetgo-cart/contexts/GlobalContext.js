import * as React from 'react';
import useRootReducer from 'use-root-reducer';

import { cartReducer, errorReducer } from '../reducers';
import useLocalStorage from '../hooks/useLocalStorage';

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

  React.useEffect(() => {
    // set carts into local storage
    setCartInLocalStorage(state.cart);
  }, [state.cart]);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
