import { memo, useState, useContext } from 'react';

import { Button, Card, Elevation, Dialog } from '@blueprintjs/core';
import styled from 'styled-components';

import { GlobalContext } from '../../contexts';
import { ADD_PRODUCT_TO_CART_ACTION } from '../../constants/ActionTypes';
import { ProductProps } from './interfaces';

const Product = memo<ProductProps>((props) => {
	const { product, ...rest } = props;

	const {
		state: { addProductToCart },
		dispatch,
	} = useContext(GlobalContext);

	const [purchaseAmount, setPurchaseAmount] = useState(1);
	const [imageDialog, setImageDialog] = useState(null);

	const openImageDialog = (image: string): void => {
		setImageDialog(image);
	};

	const closeImageDialog = (): void => {
		setImageDialog(null);
	};

	const addProductToCartFunc = (): void => {
		dispatch({
			type: ADD_PRODUCT_TO_CART_ACTION.ADD_PRODUCT_TO_CART,
			payload: { product: { ...product, purchaseAmount } },
		});
	};

	const increaseAmount = (): void => {
		setPurchaseAmount((prev) => prev + 1);
	};

	const decreaseAmount = (): void => {
		setPurchaseAmount((prev) => prev - 1);
	};

	return (
		<Card interactive={false} elevation={Elevation.TWO} {...rest}>
			<h4 className="bp3-heading">{product.name}</h4>
			<StyledImageContainer>
				{product.images.map((image) => (
					<StyledProductImageWrapper
						src={image}
						alt={product.name}
						key={image}
						onClick={() => openImageDialog(image)}
					/>
				))}
			</StyledImageContainer>

			<StyledImageDialogWrapper
				isOpen={Boolean(imageDialog)}
				onClose={closeImageDialog}
				title={product.name}
			>
				<StyledZoomInImageWrapper src={imageDialog} />
			</StyledImageDialogWrapper>

			<StyledBottomContainer>
				<StyledAddToCart>
					<StyledPurchaseAmountContainer>
						<StyledPurchaseAmountButton
							onClick={decreaseAmount}
							disabled={
								(addProductToCart.checking &&
									addProductToCart.product.id === product.id) ||
								purchaseAmount === 1
							}
						>
							-
						</StyledPurchaseAmountButton>{' '}
						<b>{purchaseAmount}</b>
						<StyledPurchaseAmountButton
							onClick={increaseAmount}
							disabled={
								(addProductToCart.checking &&
									addProductToCart.product.id === product.id) ||
								purchaseAmount === product.amount
							}
						>
							+
						</StyledPurchaseAmountButton>
					</StyledPurchaseAmountContainer>

					<StyledAddToCartButton
						onClick={addProductToCartFunc}
						disabled={
							addProductToCart.checking &&
							addProductToCart.product.id === product.id
						}
						className="bp3-outlined"
						icon="add"
						text="加入購物車"
					/>
				</StyledAddToCart>
				<StyledAmountAndPrice>
					<div className="bp3-running-text">
						<div className="bp3-text-large">
							<>商品數量: {product.amount}</>
						</div>
						<div className="bp3-text-large">
							<>商品價錢: {product.price * purchaseAmount}</>
						</div>
					</div>
				</StyledAmountAndPrice>
			</StyledBottomContainer>
		</Card>
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

const StyledAddToCart = styled.div`
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

const StyledAddToCartButton = styled(Button)`
	width: 100%;
	margin-top: 1em;
`;

const StyledPurchaseAmountButton = styled(Button)`
	border-radius: 50%;
`;

export default Product;
