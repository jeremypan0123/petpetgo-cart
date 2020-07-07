import { useContext, useRef, useEffect } from 'react';
import Head from 'next/head';

import { Position, Toast, Toaster } from '@blueprintjs/core';

import ProductList from '../components/ProductList';
import { getLayout } from '../layouts/Visitor';
import { GlobalContext } from '../contexts';
import { ADD_PRODUCT_TO_CART_ACTION } from '../constants/ActionTypes';
export default function Home() {
	const {
		state: { addProductToCart },
		dispatch,
	} = useContext(GlobalContext);

	const toasts = useRef([]);
	const toaster = useRef(null);
	const refHandlers = useRef({
		toaster: (ref: unknown) => (toaster.current = ref),
	});

	const addToast = (msg: string) => {
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
	useEffect(() => {
		return () => {
			dispatch({ type: ADD_PRODUCT_TO_CART_ACTION.ADD_PRODUCT_TO_CART_RESET });
		};
	}, [dispatch]);

	return (
		<div className="container">
			<Head>
				<title>Petpetgo</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<h3 className="bp3-heading">商品</h3>
				<ProductList />
			</main>

			<Toaster position={Position.TOP} ref={refHandlers.current.toaster}>
				{toasts.current.map((toast, index) => (
					<Toast {...toast} key={index} />
				))}
			</Toaster>
		</div>
	);
}

Home.getLayout = getLayout;
