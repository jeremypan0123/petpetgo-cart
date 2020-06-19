import * as React from 'react';

import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import CartItem from '../../components/CartItem';

const cartItem = {
  id: 0,
  name: 'Mock CartItem',
  images: [],
  amount: 2,
  purchaseAmount: 1,
  price: 999,
};

test('Rendered without errors', () => {
  render(<CartItem item={cartItem} />);
  expect(screen.queryByText('Mock CartItem')).toBeInTheDocument();
});

// test('Unable to click + button when amount is equal to purchase amount', async () => {
//   render(<CartItem item={cartItem} />);
//   expect(screen.queryByText('Mock CartItem')).toBeInTheDocument();

//   fireEvent.click(screen.getByText('+'));
//   await waitFor(() => {
//     expect(screen.queryByText('+')).toHaveClass('disabled');
//   });
// });
