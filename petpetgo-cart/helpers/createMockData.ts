export function createMockProducts(): Promise<ProductField[]> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(
				mockProducts.map((product) => ({
					...product,
				})),
			);
		}, 2000);
	});
}

export const createMockCartItems = (amount: number) => {
	const items = [];

	for (let i = 0; i < amount; i++) {
		items.push({
			id: i,
			name: `product-${i}`,
			images: [],
			amount: 999,
			price: i,
		});
	}

	return items;
};

export const mockProducts: ProductField[] = [
	{
		id: 18567,
		name:
			'小米生態鏈 喝水量UP! 毛家庭必入手! 智能活水四重過濾循環靜音 貓貓狗狗寵物飲水機 (2L)',
		images: [
			'/products/18567/products_1591761746935-P1020150.JPG',
			'/products/18567/products_1591757585982-200609_小米飲水機_商品圖.jpg',
			'/products/18567/products_1591761746965-P1020157.JPG',
			'/products/18567/products_1591761747044-P1025110.jpg',
		],
		amount: 70,
		price: 1690,
	},
	{
		id: 11678,
		name:
			'終結肉眼看不見的粉刺!貓皰疹剋星!貓咪泡沫FUN鬆洗 150ML 洗腳掌洗下巴屁股局部清潔保濕保健保養用品推薦',
		images: [
			'/products/11678/products_1545633348207-11678_1.jpg',
			'/products/11678/products_1545633348574-11678_2.jpg',
			'/products/11678/products_1545633348397-11678_3.jpg',
			'/products/11678/products_1545633348444-11678_4.jpg',
		],
		amount: 35,
		price: 390,
	},
	{
		id: 15672,
		name: '寵物瞬間去味除臭液(自然無味) (50ml/300ml)',
		images: [
			'/products/15672/products_1566554288113-20190725_075220999_iOS.jpg',
			'/products/15672/products_1566807470262-190819_光能淨商品圖1.jpg',
			'/products/15672/products_1582190079118-20190725_075043800_iOS.jpg',
			'/products/15672/products_1582190079327-20190725_075147888_iOS.jpg',
		],
		amount: 39,
		price: 450,
	},
	{
		id: 10216,
		name:
			'別再抓壞家具!!超實用多功能三用益智組合耐抓貓抓板 - 拱橋形（內含兩行軌道球，適合單貓/多貓家庭）別再抓壞家具!!超實用多功能三用益智組合耐抓貓抓板 - 拱橋形（內含兩行軌道球，適合單貓/多貓家庭）',
		images: [
			'/products/10216/products_1574910419755-10216_06.jpg',
			'/products/10216/products_1574910419778-10216_.jpg',
			'/products/10216/products_1574910419784-10216_04.jpg',
			'/products/10216/products_1574910419813-10216_05.jpg',
		],
		amount: 2,
		price: 555,
	},
	{
		id: 12345,
		name:
			'小米生態鏈 喝水量UP! 毛家庭必入手! 智能活水四重過濾循環靜音 貓貓狗狗寵物飲水機 (2L)',
		images: [
			'/products/18567/products_1591761746935-P1020150.JPG',
			'/products/18567/products_1591757585982-200609_小米飲水機_商品圖.jpg',
			'/products/18567/products_1591761746965-P1020157.JPG',
			'/products/18567/products_1591761747044-P1025110.jpg',
		],
		amount: 70,
		price: 1690,
	},
	{
		id: 54321,
		name:
			'終結肉眼看不見的粉刺!貓皰疹剋星!貓咪泡沫FUN鬆洗 150ML 洗腳掌洗下巴屁股局部清潔保濕保健保養用品推薦',
		images: [
			'/products/11678/products_1545633348207-11678_1.jpg',
			'/products/11678/products_1545633348574-11678_2.jpg',
			'/products/11678/products_1545633348397-11678_3.jpg',
			'/products/11678/products_1545633348444-11678_4.jpg',
		],
		amount: 35,
		price: 390,
	},
	{
		id: 78945,
		name: '寵物瞬間去味除臭液(自然無味) (50ml/300ml)',
		images: [
			'/products/15672/products_1566554288113-20190725_075220999_iOS.jpg',
			'/products/15672/products_1566807470262-190819_光能淨商品圖1.jpg',
			'/products/15672/products_1582190079118-20190725_075043800_iOS.jpg',
			'/products/15672/products_1582190079327-20190725_075147888_iOS.jpg',
		],
		amount: 39,
		price: 450,
	},
	{
		id: 45612,
		name:
			'別再抓壞家具!!超實用多功能三用益智組合耐抓貓抓板 - 拱橋形（內含兩行軌道球，適合單貓/多貓家庭）別再抓壞家具!!超實用多功能三用益智組合耐抓貓抓板 - 拱橋形（內含兩行軌道球，適合單貓/多貓家庭）',
		images: [
			'/products/10216/products_1574910419755-10216_06.jpg',
			'/products/10216/products_1574910419778-10216_.jpg',
			'/products/10216/products_1574910419784-10216_04.jpg',
			'/products/10216/products_1574910419813-10216_05.jpg',
		],
		amount: 2,
		price: 555,
	},
];

export interface ProductField {
	id: number;
	name: string;
	images: string[];
	amount: number;
	price: number;
}
