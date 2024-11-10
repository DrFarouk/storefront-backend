import express, { Request, Response } from "express";
import { Order, orderModel } from "../models/orderModel";
import Authorize from "../utilities/authorizer";

const newOrderModel = new orderModel();

// using model (create) & authorization to Create new order

const create = async (req: Request, res: Response) => {
	const { user_id, status } = req.body;
	if (user_id === undefined || status === undefined) {
		res.status(400);
		return res.send("Missing or Invalid (user_id or status)");
	}
	const order: Order = { user_id, status };
	try {
		Authorize(req, user_id);
	} catch (err) {
		res.status(401);
		res.json("invalid token, Access denied");
		return;
	}
	try {
		const newOrder = await newOrderModel.create(order);
		res.json(newOrder);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

// using model (currentOrderByUserId) & authorization to List user open orders

const currentOrderByUserId = async (req: Request, res: Response) => {
	const user_id = parseInt(req.params.user_id);
	if (user_id === undefined) {
		res.status(400);
		return res.send("Missing or invalid user_id");
	}
	try {
		Authorize(req, user_id);
	} catch (err) {
		res.status(401);
		return res.json(err);
	}
	try {
		const orders = await newOrderModel.currentOrderByUserId(user_id);
		res.json(orders);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

/* Setup Routes */
const orders_routes = (app: express.Application) => {
	app.post("/orders", create);
	app.get("/orders/:user_id", currentOrderByUserId);
};

export default orders_routes;