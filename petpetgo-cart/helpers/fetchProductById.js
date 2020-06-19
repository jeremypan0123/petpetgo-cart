export function fetchProductById(ids) {
  return new Promise(async (resolve, reject) => {
    setTimeout(() => {
      try {
        if (ids instanceof Array) {
          const newArr = ids.map((id) => ({
            id: id,
            name: `product-${i}`,
            images: [],
            amount: 999,
            price: parseInt(id),
          }));
          resolve(newArr);
        } else {
          resolve({
            id: ids,
            name: `product-${ids}`,
            images: [],
            amount: 999,
            price: parseInt(ids),
          });
        }
      } catch (err) {
        return err;
      }
    }, 2000);
  });
}
