import * as React from 'react';
import Link from 'next/link';

import { Navbar, Alignment, Button } from '@blueprintjs/core';

import styled from 'styled-components';

// default layout for visitor
const VisitorLayout = (props) => {
  const { children } = props;
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
    </div>
  );
};

const StyledContainer = styled.div`
  padding: 1em;
`;

export const getLayout = (page) => <VisitorLayout>{page}</VisitorLayout>;

export default VisitorLayout;
