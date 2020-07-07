import { CartItemField } from '../components/CartItem/interfaces';

export interface CheckoutResult {
	status: number;
	result?: {
		items: CartItemField[];
	};
	message?: string;
}

export function mockCheckout(cart: {
	items: CartItemField[];
}): Promise<CheckoutResult> {
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
			reject({
				status: 404,
				message: err,
			});
		}
	});
}
