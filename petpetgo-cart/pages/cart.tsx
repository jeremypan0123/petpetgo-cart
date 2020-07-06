import * as React from 'react';
import Head from 'next/head';
import Router from 'next/router';

import { Card, Elevation, Spinner, Intent, Alert } from '@blueprintjs/core';
import styled from 'styled-components';

import { getLayout } from '../layouts/Visitor';
import { GlobalContext } from '../contexts';
import { mockCheckout } from '../helpers/checkout';
import * as types from '../constants/ActionTypes';
import CartList from '../components/CartList';

const CartPage = () => {
  const { state, dispatch } = React.useContext(GlobalContext);
  const { cart } = state;
  const [checkouting, setCheckouting] = React.useState(false);
  const [checkoutAlertOpen, setCheckoutAlertOpen] = React.useState(false);

  const openCheckoutAlert = (): void => {
    setCheckoutAlertOpen(true);
  };
  const closeCheckoutAlert = (): void => {
    setCheckoutAlertOpen(false);
  };

  const checkout = async () => {
    if (checkoutTotal() === 0) {
      openCheckoutAlert();
    } else {
      setCheckouting(true);
      try {
        const checkoutRes = await mockCheckout(cart);
        if (checkoutRes.status === 200) {
          Router.push('/checkoutSuccess');
        }
      } catch (err) {
        dispatch({ type: types.GENERAL_ERROR, payload: { message: err } });
      } finally {
        // setCheckouting(false);
      }
    }
  };

  const checkoutTotal = (): number => {
    let total = 0;
    cart.items.map((item) => (total += item.price * item.purchaseAmount));
    return total;
  };

  return (
    <>
      <StyledCartContainer>
        <Head>
          <title>Petpetgo - 購物車</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <StyledContentWrapper>
          <h3 className="bp3-heading">購物車</h3>
          <CartList />
        </StyledContentWrapper>
        <StyledCheckoutPlaceholder />
        <StyledCheckoutContainer
          onClick={checkout}
          interactive={false}
          elevation={Elevation.FOUR}
        >
          <StyledCheckoutWrapper>
            <div className="bp3-text-large">結帳</div>
            <div className="bp3-text-large">{`(總計: ${checkoutTotal()})`}</div>
          </StyledCheckoutWrapper>
        </StyledCheckoutContainer>
        {checkouting && (
          <StyledSpinnerWrapper>
            <Spinner intent={Intent.PRIMARY} />
          </StyledSpinnerWrapper>
        )}
      </StyledCartContainer>
      <Alert
        isOpen={checkoutAlertOpen}
        canOutsideClickCancel={true}
        onClose={closeCheckoutAlert}
        onConfirm={closeCheckoutAlert}
        confirmButtonText="知道了"
      >
        請先加入商品至購物車
      </Alert>
    </>
  );
};

CartPage.getLayout = getLayout;

const StyledCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const StyledContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 80%;
  text-align: left;
  width: 100%;
`;

const StyledCheckoutPlaceholder = styled.div`
  width: 100%;
  height: 5rem;
`;

const StyledCheckoutContainer = styled(Card)`
  width: 100%;
  position: fixed;
  bottom: 0;
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

const StyledCheckoutWrapper = styled.div`
  text-align: center;
`;

export default CartPage;
