import * as React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import CartItem from '../../components/CartItem';

const cartItem = {
  id: 0,
  name: 'Mock CartItem',
  images: [],
  amount: 999,
  selectedAmount: 1,
  price: 999,
};

test('Rendered without errors', () => {
  render(<CartItem item={cartItem} />);
  expect(screen.queryByText('Mock CartItem')).toBeInTheDocument();
});
