import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';

import { Card, Elevation, Spinner, Intent } from '@blueprintjs/core';
import styled from 'styled-components';

import { getLayout } from '../layouts/Visitor';
import CartItem from '../components/CartItem';
import Product from '../components/Product';
import { GlobalContext } from '../contexts';
import { createMockProducts } from '../helpers/createMockData';
import { mockCheckout } from '../helpers/checkout';
import * as types from '../constants/ActionTypes';
import ProductList from '../components/ProductList';

const CartPage = () => {
  const { state, dispatch } = React.useContext(GlobalContext);
  const { cart } = state;
  const [products, setProducts] = React.useState([]);
  const [checkouting, setCheckouting] = React.useState(false);

  const checkout = async () => {
    setCheckouting(true);
    try {
      const checkoutRes = await mockCheckout(cart);
      if (checkoutRes.status === 200) {
        dispatch({ type: types.CLEAR_CART });
        Router.push('/checkoutSuccess');
      }
    } catch (err) {
      dispatch({ type: types.GENERAL_ERROR, payload: { message: err } });
    } finally {
      setCheckouting(false);
    }
  };

  const checkoutTotal = () => {
    let total = 0;
    cart.items.map((item) => (total += item.price * item.purchaseAmount));
    return total;
  };

  React.useEffect(() => {
    setProducts(createMockProducts(5));
  }, []);

  return (
    <StyledCart>
      <StyledCartContainer>
        <Head>
          <title>Petpetgo - Cart</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <StyledContentWrapper>
          <p>Cart</p>
          {cart.items.map((cartIten) => (
            <CartItem item={cartIten} key={cartIten.id} />
          ))}

          <p>Products</p>
          <ProductList />
        </StyledContentWrapper>

        <StyledCheckout>
          <StyledCheckoutWrapper
            onClick={checkout}
            interactive={false}
            elevation={Elevation.FOUR}
          >
            <div>Checkout</div>
            <div>
              Total:
              {checkoutTotal()}
            </div>
          </StyledCheckoutWrapper>
        </StyledCheckout>

        {checkouting && (
          <StyledSpinnerWrapper>
            <Spinner intent={Intent.PRIMARY} />
          </StyledSpinnerWrapper>
        )}
      </StyledCartContainer>
    </StyledCart>
  );
};

CartPage.getLayout = getLayout;

const StyledCart = styled.div``;

const StyledCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const StyledContentWrapper = styled.section`
  flex-grow: 1;
`;

const StyledCheckout = styled.div`
  position: sticky;
  bottom: 0;
  width: 100%;
`;

const StyledCheckoutWrapper = styled(Card)`
  width: 100%;
  height: 100%;
`;

const StyledSpinnerWrapper = styled.div`
  z-index: 9999;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: fiex;
  justify-content: center;
  align-items: center;
  background: grey;
  opacity: 0.5;
`;

export default CartPage;
