export interface CartItemProps {
	/** 存在購物車的產品 */
	item: CartItemField;
	/** User 調整購買產品的數量 */
	onAmountChange: () => void;
}

export interface CartItemField {
	/** 產品的unique id */
	id: number;
	/** 產品名稱 */
	name: string;
	/** 產品圖片 */
	images: string[];
	/** 產品的數量 */
	amount: number;
	/** User 購買的數量 */
	purchaseAmount: number;
	/** 產品的價錢 */
	price: number;
}
