import { Product, productModel } from "../../models/productModel";

const newProductModel = new productModel();

const testProduct: Product = { name: "Test_product_M", price: 100 };
let product: Product;

describe("Testing (product) Model", () => {
	it("Testing (create) Model", () => {
		expect(newProductModel.create).toBeDefined();
	});

	it("Testing (create) model logic", async () => {
		product = await newProductModel.create(testProduct);
		expect({ name: product.name, price: product.price }).toEqual({
			name: testProduct.name,
			price: testProduct.price,
		});
	});

	it("Testing (index) Model", () => {
		expect(newProductModel.index).toBeDefined();
	});

	it("Testing (index) model logic", async () => {
		const products = await newProductModel.index();
		expect(products).toContain(product);
	});

	it("Testing (show) Model", () => {
		expect(newProductModel.show).toBeDefined();
	});

	it("Testing (show) model logic", async () => {
		const foundProduct = await newProductModel.show(product.id as number);
		expect(foundProduct).toEqual(product);
	});

});
