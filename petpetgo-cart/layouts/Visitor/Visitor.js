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
    <div>
      <nav>
        <Navbar>
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>Petpetgo</Navbar.Heading>
          </Navbar.Group>
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
      </nav>
      <main>
        <StyledContainer>{children}</StyledContainer>
      </main>

      <Alert
        isOpen={Boolean(error)}
        canOutsideClickCancel={true}
        onClose={closeErrorAlert}
        onConfirm={closeErrorAlert}
        confirmButtonText="Got it"
      >
        {error && `${error.message}`}
      </Alert>
    </div>
  );
};

const StyledContainer = styled.div`
  padding: 1em;
`;

export const getLayout = (page) => <VisitorLayout>{page}</VisitorLayout>;

export default VisitorLayout;
