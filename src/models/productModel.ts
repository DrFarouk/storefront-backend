import Client from "../database";

// formatting types for Product Model
export type Product = {
	id?: number;
	name: string;
	price: number;
};

export class productModel {

    // setting up model (create) to use it in routes

    async create(p: Product): Promise<Product> {
		try {
			const con = await Client.connect();
			const sql = "INSERT INTO products (name, price) VALUES($1, $2) RETURNING *";
			const result = await con.query(sql, [p.name, p.price]);
			con.release();
			return result.rows[0];
		} catch (error) {
			throw new Error(`Couldn't create product ${p}, ${error}`);
		}
	}

    // setting up model (index) to use it in routes

	async index(): Promise<Product[]> {
		try {
			const con = await Client.connect();
			const sql = "SELECT * FROM products";
			const result = await con.query(sql);
			con.release();
			return result.rows;
		} catch (error) {
			throw new Error(`Couldn't find products, ${error}`);
		}
	}

	// setting up model (show) to use it in routes

	async show(id: number): Promise<Product> {
		try {
			const con = await Client.connect();
			const sql = "SELECT * FROM products WHERE id=($1)";
			const result = await con.query(sql, [id]);
			con.release();
			return result.rows[0];
		} catch (error) {
			throw new Error(`Couldn't get product ${id}, ${error}`);
		}
	}
}
