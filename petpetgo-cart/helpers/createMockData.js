export const createMockProducts = (amount) => {
  let products = [];

  for (let i = 0; i < amount; i++) {
    products.push({
      id: i,
      name: `product-${i}`,
      images: [],
      amount: 999,
      price: i,
    });
  }

  return products;
};

export const createMockCartItems = (amount) => {
  let items = [];

  for (let i = 0; i < amount; i++) {
    items.push({
      id: i,
      name: `product-${i}`,
      images: [],
      amount: 999,
      purchaseAmount: 1,
      price: i,
    });
  }

  return items;
};
