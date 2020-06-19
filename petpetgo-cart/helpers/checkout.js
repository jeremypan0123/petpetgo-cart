export function mockCheckout(cart) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve({
          status: 200,
          result: {
            items: cart.items,
          },
        });
      }, 2000);
    } catch (err) {
      reject(err);
    }
  });
}
