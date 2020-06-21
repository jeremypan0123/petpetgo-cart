import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Navbar, Alignment, Button, Alert } from '@blueprintjs/core';
import styled from 'styled-components';

import { GlobalContext } from '../../contexts';
import * as types from '../../constants/ActionTypes';

// default layout for visitor
const VisitorLayout = (props) => {
  const { children } = props;
  const {
    state: { error },
    dispatch,
  } = React.useContext(GlobalContext);

  const closeErrorAlert = () => {
    dispatch({ type: types.CLEAN_ERROR });
  };

  const router = useRouter();

  return (
    <StyledBody>
      <StyledBanner>
        <Navbar>
          <Link href="/">
            <StyledHref>
              <Navbar.Group align={Alignment.LEFT}>
                <div className="bp3-text-large">Petpetgo</div>
                <Navbar.Heading></Navbar.Heading>
              </Navbar.Group>
            </StyledHref>
          </Link>
          <Navbar.Group align={Alignment.RIGHT}>
            {router.pathname === '/' ? (
              <Link href="/cart">
                <a>
                  <Button
                    className="bp3-minimal"
                    icon="shopping-cart"
                    text="前往購物車"
                  />
                </a>
              </Link>
            ) : (
              <Link href="/">
                <a>
                  <Button
                    className="bp3-minimal"
                    icon="shop"
                    text="前往購物中心"
                  />
                </a>
              </Link>
            )}
          </Navbar.Group>
        </Navbar>
      </StyledBanner>
      <StyledMain>
        <StyledContainer>{children}</StyledContainer>
      </StyledMain>

      <Alert
        isOpen={Boolean(error)}
        canOutsideClickCancel={true}
        onClose={closeErrorAlert}
        onConfirm={closeErrorAlert}
        confirmButtonText="Got it"
      >
        {error && `${error.message}`}
      </Alert>
    </StyledBody>
  );
};

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const StyledBanner = styled.nav`
  height: auto;
`;

const StyledMain = styled.main`
  flex-grow: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;

const StyledContainer = styled.div`
  padding: 1em;
  height: 100%;
`;

const StyledHref = styled.a`
  text-decoration: none;
  color: black;
`;

export const getLayout = (page) => <VisitorLayout>{page}</VisitorLayout>;

export default VisitorLayout;
