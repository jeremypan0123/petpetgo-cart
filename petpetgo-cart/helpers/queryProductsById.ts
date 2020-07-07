import { mockProducts } from './createMockData';

export function queryProductsById(ids) {
	return new Promise(async (resolve, reject) => {
		setTimeout(() => {
			try {
				if (ids instanceof Array) {
					const res = ids.map((id) => {
						const mock = mockProducts.find((product) => product.id === id);
						return { ...mock };
					});
					resolve(res);
				} else {
					resolve({ ...mockProducts.find((product) => product.id === ids) });
				}
			} catch (err) {
				reject(err);
			}
		}, 2000);
	});
}
