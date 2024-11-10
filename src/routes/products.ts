import express, { Request, Response } from "express";
import { Product, productModel } from "../models/productModel";
import Authorize from "../utilities/authorizer";

const newProductModel = new productModel();

// using model (create) & authorization to Create new product

const create = async (req: Request, res: Response) => {
	const { name, price } = req.body;
	if (name === undefined || price === undefined) {
		res.status(400);
		return res.send("Missing or invalid (name or price)");
	}
	const product: Product = { name, price };
	try {
		Authorize(req);
	} catch (err) {
		res.status(401);
		return res.json("Invalid token, Access denied");
	}
	try {
		const newProduct = await newProductModel.create(product);
		res.json(newProduct);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

// using model (index) to List all products

const index = async (_req: Request, res: Response) => {
	try {
		const products = await newProductModel.index();
		res.json(products);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

// using model (show) to Load product by Id

const show = async (req: Request, res: Response) => {
	const id = parseInt(req.params.id);
	if (id === undefined) {
		res.status(400);
		return res.send("Missing or invalid id");
	}
	try {
		const product = await newProductModel.show(id);
		if (product === undefined) {
			res.status(404);
			return res.json("Product not found");
		}
		res.json(product);
	} catch (err) {
		res.status(400);
		res.json(err);
	}	
};

/* Setup Routes */
const products_routes = (app: express.Application) => {
	app.post("/products", create);
	app.get("/products", index);
	app.get("/products/:id", show);
};

export default products_routes;
