import { User, userModel } from "../../models/userModel";

const newUserModel = new userModel();

const testUser: User = { firstname: "Test_FN_M", lastname: "Test_LN_M", password: "Test_Password" };
let user: User;

describe("Testing (User) Model", () => {
	it("Testing (create) Model", () => {
		expect(newUserModel.create).toBeDefined();
	});

	it("Testing (create) model logic", async () => {
		user = await newUserModel.create(testUser);
		expect({ firstname: user.firstname, lastname: user.lastname }).toEqual({
			firstname: testUser.firstname,
			lastname: testUser.lastname,
		});
	});

	it("Testing (index) Model", () => {
		expect(newUserModel.index).toBeDefined();
	});

	it("Testing (index) model logic", async () => {
		const users = await newUserModel.index();
		expect(users).toContain(user);
	});

	it("Testing (show) Model", () => {
		expect(newUserModel.show).toBeDefined();
	});

	it("Testing (show) model logic", async () => {
		const foundUser = await newUserModel.show(user.id as number);
		expect(foundUser).toEqual(user);
	});
});
