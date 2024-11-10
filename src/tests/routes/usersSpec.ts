import supertest from "supertest";
import app from "../../server";
import { JwtPayload, verify } from "jsonwebtoken";

import { User } from "../../models/userModel";

const testUser: User = { firstname: "Test_FN_2", lastname: "Test_LN_2", password: "Test_Password" };
let testUserId: string;
let testToken: string;

const request = supertest(app);
describe("Testing (/users) Endpoint", () => {

	it("Testing (create) endpoint", async () => {
		await request
			.post("/users")
			.send(testUser)
			.expect(200)
			.then((res) => {
				testToken = res.body;
				const decodedJWT = verify(testToken as string, process.env.TOKEN_SECRET as string) as JwtPayload;
				testUserId = decodedJWT.user.id;
			});
	});

	it("Testing (index) endpoint with token", async () => {
		await request.get("/users").set("Authorization", `Bearer ${testToken}`).expect(200);
	});

	it("Testing (show) endpoint with token and user ID", async () => {
		await request.get(`/users/${testUserId}`).set("Authorization", `Bearer ${testToken}`).expect(200);
	});

	it("Testing (authorization) endpoint", async () => {
		await request.post("/users/login").send(testUser).expect(200);
	});
});
