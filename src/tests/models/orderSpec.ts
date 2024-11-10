import { Order, orderModel } from "../../models/orderModel";
import { User, userModel } from "../../models/userModel";

const newOrderModel = new orderModel();
const newUserModel = new userModel();

const testOrder: Order = { user_id: "", status: "active" };
let order: Order;
const testUser: User = { firstname: "Test_FN_M", lastname: "Test_LN_M", password: "Test_Password" };

describe("Testing (order) Model", () => {
	beforeAll(async () => {
		const user = await newUserModel.create(testUser);
		if (user.id) testOrder.user_id = user.id.toString();
	});

	it("Testing (create) Model", () => {
		expect(newOrderModel.create).toBeDefined();
	});

	it("Testing (create) model logic", async () => {
		order = await newOrderModel.create(testOrder);
		expect({ user_id: order.user_id, status: order.status }).toEqual({
			user_id: testOrder.user_id,
			status: testOrder.status,
		});
	});

	it("Testing (currentOrderByUserId) Model", () => {
		expect(newOrderModel.currentOrderByUserId).toBeDefined();
	});

	it("Testing (currentOrderByUserId) Model logic", async () => {
		const foundOrder = await newOrderModel.currentOrderByUserId(parseInt(order.user_id));
		expect({ user_id: order.user_id, status: order.status }).toEqual({
			user_id: testOrder.user_id,
			status: testOrder.status,
		});
	});
});