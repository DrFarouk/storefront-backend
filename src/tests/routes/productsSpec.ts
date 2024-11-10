import supertest from "supertest";
import app from "../../server";
import { User } from "../../models/userModel";
import { Product } from "../../models/productModel";

const request = supertest(app);

const testProduct: Product = { name: "Test_product_1", price: 100 };
const testUser: User = { firstname: "Test_FN_1", lastname: "Test_LN_1", password: "Test_Password" };
let testProductId: string;
let testToken: string;

describe("Testing (/products) Endpoint", () => {

	beforeAll(async () => {
		await request
			.post("/users")
			.send(testUser)
			.expect(200)
			.then((res) => {
				testToken = res.body;
			});
	});

	it("Testing (create) endpoint with token", async () => {
		await request
			.post("/products")
			.send(testProduct)
			.set("Authorization", `Bearer ${testToken}`)
			.expect(200)
			.then((res) => {
				expect(res.body.name).toEqual("Test_product_1");
				testProductId = res.body.id;
			});
	});

	it("Testing (index) endpoint", async () => {
		await request
			.get("/products")
			.expect(200)
			.then((res) => {
				expect(res.text).toContain("Test_product_1");
			});
	});

	it("Testing (show) endpoint with Product ID", async () => {
		await request
			.get(`/products/${testProductId}`)
			.expect(200)
			.then((res) => {
				expect(res.text).toContain("Test_product_1");
			});
	});
});
