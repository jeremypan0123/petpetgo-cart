import * as React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Product from '../../components/Product';

const product = {
  id: 0,
  name: 'Mock Product',
  images: [],
  amount: 1,
  price: 999,
};

test('Rendered without errors', () => {
  render(<Product product={product} />);
  expect(screen.queryByText('Mock Product')).toBeInTheDocument();
});
