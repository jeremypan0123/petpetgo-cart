import { mockProducts } from './createMockData';

export function fetchProductById(ids) {
  return new Promise(async (resolve, reject) => {
    setTimeout(() => {
      try {
        if (ids instanceof Array) {
          const newArr = ids.map((id) =>
            mockProducts.find((product) => product.id === id),
          );
          resolve(newArr);
        } else {
          resolve(mockProducts.find((product) => product.id === ids));
        }
      } catch (err) {
        return err;
      }
    }, 2000);
  });
}
