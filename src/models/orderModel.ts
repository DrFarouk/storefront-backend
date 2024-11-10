import Client from "../database";

// formatting types for Order Model
export type Order = {
	id?: number;
	user_id: string;
	status: string;
};


export class orderModel {

    // setting up model (create) to use it in routes

	async create(order: Order): Promise<Order> {
		try {
			const con = await Client.connect();
			const sql = "INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *";
			const result = await con.query(sql, [order.user_id, order.status]);
			con.release();
			return result.rows[0];
		} catch (error) {
			throw new Error(`Couldn't create order ${order}, ${error}`);
		}
	}

	// setting up model (currentOrderByUserId) to use it in routes

	async currentOrderByUserId(userId: number): Promise<Order[]> {
		try {
			const con = await Client.connect();
			const sql = "SELECT * FROM orders WHERE user_id=($1) AND status=($2)";
			const result = await con.query(sql, [userId, "active"]);
			con.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Couldn't get current user orders, ${err}`);
		}
	}
}
