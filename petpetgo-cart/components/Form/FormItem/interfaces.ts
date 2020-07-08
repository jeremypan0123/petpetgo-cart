export interface FormProps {
	/** 此欄位是否必填 */
	isRequired: boolean;
	/** 預設文字 */
	placeholder?: string;
	/** 當欄位更改時呼叫的Function */
	onChange?: () => void;
}
