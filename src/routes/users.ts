import express, { Request, Response } from "express";
import { User, userModel } from "../models/userModel";
import { sign } from "jsonwebtoken";
import Authorize from "../utilities/authorizer";

const newUserModel = new userModel();

// using model (create) to Create new user

const create = async (req: Request, res: Response) => {
	const { firstname, lastname, password } = req.body;
	if (firstname === undefined || lastname === undefined || password === undefined) {
		res.status(400);
		return res.send("Missing or invalid (firstname, lastname or password)");
	}
	const user: User = { firstname, lastname, password };
	try {
		const newUser = await newUserModel.create(user);
		var token = sign({ user: { id: newUser.id, firstname, lastname } }, process.env.TOKEN_SECRET as string);
		res.json(token);
	} catch (err) {
		res.status(400);
		res.json(String(err) + user);
	}
};

// using model (index) & authorization to List all users

const index = async (req: Request, res: Response) => {
	try {
		Authorize(req);
	} catch (err) {
		res.status(401);
		return res.json(err);
	}
	try {
		const user = await newUserModel.index();
		res.json(user);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

// using model (show) & authorization to Load user by Id

const show = async (req: Request, res: Response) => {
	const id = parseInt(req.params.id);
	if (id === undefined) {
		res.status(400);
		return res.send("Missing or invalid id");
	}
	try {
		Authorize(req);
	} catch (err) {
		res.status(401);
		return res.json(err);
	}
	try {
		const user = await newUserModel.show(id);
		if (user === undefined) {
			res.status(404);
			return res.json("User not found");
		}
		res.json(user);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

// using model (authenticate) to Logs user in & authenticate user

const authenticate = async (req: Request, res: Response) => {
	const { firstname, lastname, password } = req.body;
	if (firstname === undefined || lastname === undefined || password === undefined) {
		res.status(400);
		return res.send("Missing or Invalid  (firstname, lastname or password)");
	}
	const user: User = { firstname, lastname, password };
	try {
		const u = await newUserModel.authenticate(user.firstname, user.lastname, user.password);
		if (u === null) {
			res.status(401);
			res.json("Incorrect user information");
		} else {
			var token = sign({ user: { id: u.id, firstname, lastname } }, process.env.TOKEN_SECRET as string);
			res.json(token);
		}
	} catch (error) {
		res.status(401);
		res.json({ error });
	}
};

/* Setup Routes */
const users_routes = (app: express.Application) => {
	app.post("/users", create);
	app.get("/users", index);
	app.get("/users/:id", show);
	app.post("/users/login", authenticate);
};

export default users_routes;
