import { CART_ACTION } from '../constants/ActionTypes';
import { CartItemField } from '../components/CartItem/interfaces';
import { ProductField } from '../components/Product/interfaces';

// the state of cart should contains:
// {
//   items: [
//     {
//       id, // product id
//       purchaseAmount,  // the amount of the user want to purchase
//       ...
//     },
//     ...
//   ],
// }

type ReducerAction = ADD_ITEM | ADJUST_ITEM_AMOUNT | DELETE_ITEM | CLEAR_CART;

interface Action {
	type: CART_ACTION;
	payload?: unknown;
}

interface ADD_ITEM extends Action {
	type: CART_ACTION.ADD_ITEM;
	payload: { product: ProductField };
}

interface ADJUST_ITEM_AMOUNT extends Action {
	type: CART_ACTION.ADJUST_ITEM_AMOUNT;
	payload: { id: number; count: number };
}

interface DELETE_ITEM extends Action {
	type: CART_ACTION.DELETE_ITEM;
	payload: { id: number };
}

interface CLEAR_CART extends Action {
	type: CART_ACTION.CLEAR_CART;
}

export interface CartState {
	items: CartItemField[];
}

export default function cartReducer(
	state: CartState,
	action: ReducerAction,
): CartState {
	let newState: CartState, itemIndex: number;
	switch (action.type) {
		case CART_ACTION.ADD_ITEM:
			// check the product has been added into cart or not
			newState = { ...state };
			itemIndex = newState.items.findIndex(
				(item) => item.id === action.payload.product.id,
			);
			if (itemIndex !== -1) {
				newState.items[itemIndex].purchaseAmount +=
					action.payload.product.purchaseAmount;
			} else {
				newState.items.push({ ...action.payload.product });
			}
			return newState;
		case CART_ACTION.ADJUST_ITEM_AMOUNT:
			// check the product has been added into cart or not
			newState = { ...state };
			itemIndex = newState.items.findIndex(
				(item) => item.id === action.payload.id,
			);
			if (itemIndex !== -1) {
				newState.items[itemIndex].purchaseAmount += action.payload.count;
			}
			return newState;
		case CART_ACTION.DELETE_ITEM:
			newState = { ...state };
			itemIndex = newState.items.findIndex(
				(item) => item.id === action.payload.id,
			);
			if (itemIndex !== -1) {
				newState.items.splice(itemIndex, 1);
			}
			return newState;
		case CART_ACTION.CLEAR_CART:
			return {
				items: [],
			};
		default:
			return state;
	}
}
