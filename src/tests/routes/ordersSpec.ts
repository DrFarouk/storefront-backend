import supertest from "supertest";
import app from "../../server";
import { JwtPayload, verify } from "jsonwebtoken";

import { Order } from "../../models/orderModel";
import { User } from "../../models/userModel";

const request = supertest(app);

const order: Order = { user_id: "", status: "active" };
let orderIds: string[] = [];
const testUser: User = { firstname: "Test_FN_0", lastname: "Test_LN_0", password: "Test_Password" };
let testUserId: string;
let testToken: string;


describe("Testing (/orders) Endpoint", () => {

	beforeAll(async () => {
		await request
			.post("/users")
			.send(testUser)
			.expect(200)
			.then((res) => {
				testToken = res.body;
				const decodedJWT = verify(testToken as string, process.env.TOKEN_SECRET as string) as JwtPayload;
				testUserId = decodedJWT.user.id;
				order.user_id = testUserId;
			});

		const orders: Order[] = [
			{ user_id: testUserId, status: "completed" },
			{ user_id: testUserId, status: "completed" },
			{ user_id: testUserId, status: "active" },
		];
	});

	it("Testing (create) endpoint", async () => {
		await request
			.post("/orders")
			.send(order)
			.set("Authorization", `Bearer ${testToken}`)
			.expect(200)
			.then((res) => {
				orderIds.push(res.body.id);
			});
	});

	it("Testing (current order By User ID) endpoint", async () => {
		await request
			.get(`/orders/${testUserId}`)
			.set("Authorization", `Bearer ${testToken}`)
			.expect(200)
			.then((res) => {
				expect(res.body.length).toBeGreaterThanOrEqual(1);
			});
	});
});
