import * as React from 'react';
import Link from 'next/link';

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

  return (
    <StyledBody>
      <StyledBanner>
        <Navbar>
          <Link href="/">
            <StyledHref>
              <Navbar.Group align={Alignment.LEFT}>
                Petpetgo
                <Navbar.Heading></Navbar.Heading>
              </Navbar.Group>
            </StyledHref>
          </Link>
          <Navbar.Group align={Alignment.RIGHT}>
            <Link href="/cart">
              <a>
                <Button
                  className="bp3-minimal"
                  icon="shopping-cart"
                  text="Cart"
                />
              </a>
            </Link>
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
  overflow: hidden;
`;

const StyledBanner = styled.nav`
  height: auto;
`;

const StyledMain = styled.main`
  flex-grow: 1;
  overflow: auto;
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
