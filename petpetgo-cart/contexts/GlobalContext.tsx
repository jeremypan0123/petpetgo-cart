import { ReactNode, createContext, useReducer, useEffect } from 'react';
import useRootReducer from 'use-root-reducer';

import {
	cartReducer,
	errorReducer,
	disableChangeAmountReducer,
	addProductToCartReducer,
} from '../reducers';
import useLocalStorage from '../hooks/useLocalStorage';
import { doSomethingAsync } from '../helpers/doSomethingAsync';
import {
	CART_ACTION,
	ADD_PRODUCT_TO_CART_ACTION,
	DO_SOMETHING_ASYNC_ACTION,
} from '../constants/ActionTypes';

export const GlobalContext = createContext(null);

interface GlobalContextProviderProps {
	children: ReactNode;
}

export default function GlobalContextProvider(
	props: GlobalContextProviderProps,
) {
	const { children } = props;

	// Retrieve cart data from local storage
	const [cartInLocalStorage, setCartInLocalStorage] = useLocalStorage('cart', {
		items: [],
	});

	// combine multiple reducers into one root reducer
	const [state, dispatch] = useRootReducer({
		cart: useReducer(cartReducer, cartInLocalStorage),
		error: useReducer(errorReducer, null),
		disableChangeAmount: useReducer(disableChangeAmountReducer, false),
		addProductToCart: useReducer(addProductToCartReducer, {
			product: null,
			checking: false,
			error: null,
		}),
	});

	// Change amount in cart handler
	useEffect(() => {
		async function doSomething() {
			await doSomethingAsync();
			dispatch({ type: DO_SOMETHING_ASYNC_ACTION.DO_SOMETHING_ASYNC_SUCCESS });
			setCartInLocalStorage({
				...state.cart,
			});
		}

		if (state.disableChangeAmount) {
			doSomething();
		}
	}, [state.disableChangeAmount, dispatch, setCartInLocalStorage, state.cart]);

	// Add Product to cart handler
	useEffect(() => {
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
						type: CART_ACTION.ADD_ITEM,
						payload: {
							product: {
								...state.addProductToCart.product,
								purchaseAmount: correctPurchaseAmount,
							},
						},
					});
					dispatch({
						type: ADD_PRODUCT_TO_CART_ACTION.ADD_PRODUCT_TO_CART_SUCCESS,
						payload: {
							product: state.addProductToCart.product,
						},
					});
				}
			} catch (error) {
				dispatch({
					type: ADD_PRODUCT_TO_CART_ACTION.ADD_PRODUCT_TO_CART_FAILURE,
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
	}, [state.addProductToCart, state.cart.items, dispatch]);

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
	//       // To avoid entering this effect again, update the state.cart.items in global context
	//       // without creating new state.cart object.
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
	useEffect(() => {
		setCartInLocalStorage({
			...state.cart,
		});
	}, [state.cart, setCartInLocalStorage]);

	return (
		<GlobalContext.Provider value={{ state, dispatch }}>
			{children}
		</GlobalContext.Provider>
	);
}
