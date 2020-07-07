import { memo, useState, useContext } from 'react';

import { Button, Card, Elevation, Alert, Dialog } from '@blueprintjs/core';
import styled from 'styled-components';

import { GlobalContext } from '../../contexts';
import { CART_ACTION } from '../../constants/ActionTypes';
import { CartItemProps } from './interfaces';

const CartItem = memo<CartItemProps>((props) => {
	const {
		item: { id, name, images, amount, purchaseAmount, price },
		onAmountChange,
		...rest
	} = props;

	const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
	const [imageDialog, setImageDialog] = useState(null);

	const openImageDialog = (image: string): void => {
		setImageDialog(image);
	};

	const closeImageDialog = (): void => {
		setImageDialog(null);
	};

	const openDeleteAlert = (): void => {
		setDeleteAlertOpen(true);
	};
	const closeDeleteAlert = (): void => {
		setDeleteAlertOpen(false);
	};

	const { state, dispatch } = useContext(GlobalContext);
	const { disableChangeAmount } = state;

	const increaseAmount = (): void => {
		dispatch({
			type: CART_ACTION.ADJUST_ITEM_AMOUNT,
			payload: { id, count: 1 },
		});
		if (onAmountChange) onAmountChange();
	};

	const decreaseAmount = (): void => {
		if (purchaseAmount === 1) {
			openDeleteAlert();
		} else {
			dispatch({
				type: CART_ACTION.ADJUST_ITEM_AMOUNT,
				payload: { id, count: -1 },
			});
			if (onAmountChange) onAmountChange();
		}
	};

	const deleteItem = (): void => {
		dispatch({
			type: CART_ACTION.DELETE_ITEM,
			payload: { id },
		});
	};

	return (
		<>
			<Card interactive={false} elevation={Elevation.TWO} {...rest}>
				<h4 className="bp3-heading">{name}</h4>
				<StyledImageContainer>
					{images.map((image) => (
						<StyledProductImageWrapper
							src={image}
							alt={name}
							key={image}
							onClick={() => openImageDialog(image)}
						/>
					))}

					<StyledImageDialogWrapper
						isOpen={Boolean(imageDialog)}
						onClose={closeImageDialog}
						title={name}
					>
						<StyledZoomInImageWrapper src={imageDialog} />
					</StyledImageDialogWrapper>
				</StyledImageContainer>

				<StyledBottomContainer>
					<StyledDelete>
						<StyledPurchaseAmountContainer>
							<StyledPurchaseAmountButton
								onClick={decreaseAmount}
								disabled={disableChangeAmount}
							>
								-
							</StyledPurchaseAmountButton>
							<b>{purchaseAmount}</b>
							<StyledPurchaseAmountButton
								onClick={increaseAmount}
								disabled={disableChangeAmount || purchaseAmount === amount}
							>
								+
							</StyledPurchaseAmountButton>
						</StyledPurchaseAmountContainer>
						<StyledDeleteButton
							onClick={openDeleteAlert}
							disabled={disableChangeAmount}
							className="bp3-outlined"
							icon="trash"
							text="刪除"
						/>
					</StyledDelete>
					<StyledAmountAndPrice>
						<div className="bp3-running-text">
							<div className="bp3-text-large">
								<>商品數量: {amount}</>
							</div>
							<div className="bp3-text-large">
								<>商品價錢: {price * purchaseAmount}</>
							</div>
						</div>
					</StyledAmountAndPrice>
				</StyledBottomContainer>
			</Card>

			<Alert
				isOpen={deleteAlertOpen}
				canOutsideClickCancel={true}
				onClose={closeDeleteAlert}
				onConfirm={deleteItem}
				cancelButtonText="取消"
				confirmButtonText="刪除"
			>
				{`確定要刪除 ${name} ?`}
			</Alert>
		</>
	);
});

const StyledImageContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	no-wrap: wrap;
`;

const StyledProductImageWrapper = styled.div`
	width: 50px;
	height: 50px;
	background: url(${(props) => props.src}) no-repeat;
	background-size: 48px 48px;
	box-sizing: border-box;
	margin-left: 5px;
`;

const StyledImageDialogWrapper = styled(Dialog)`
	width: 100%;
	height: 100%;
`;

const StyledZoomInImageWrapper = styled.img`
	margin-top: 1em;
	border-radius: 20px;
	width: 100%;
	height: 100%;
`;

const StyledBottomContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	wrap: nowrap;
	margin-top: 1em;
`;

const StyledDelete = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex-grow: 1;
`;

const StyledAmountAndPrice = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex-grow: 1;
	text-align: left;
`;

const StyledPurchaseAmountContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	width: 100%;
`;

const StyledDeleteButton = styled(Button)`
	width: 100%;
	margin-top: 1em;
`;

const StyledPurchaseAmountButton = styled(Button)`
	border-radius: 50%;
`;

export default CartItem;
