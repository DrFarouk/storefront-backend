import Client from "../database";

// import bcrypt to use it for hashing passwords
import bcrypt from "bcrypt";

// formatting types for User Model
export type User = {
	id?: number;
	firstname: string;
	lastname: string;
	password: string;
};

const pepper = process.env.BCRYPT_PASSWORD;
const salt_rounds = process.env.SALT_ROUNDS;

export class userModel {
	static create(testUser: User) {
		throw new Error("Method not implemented.");
	}

    // setting up model (create) to use it in routes

    async create(u: User): Promise<User> {
		try {
			const con = await Client.connect();
			const sql = "INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *";
			const hash = bcrypt.hashSync(u.password + pepper, parseInt(String(salt_rounds)));
			const result = await con.query(sql, [u.firstname, u.lastname, hash]);
			const user = result.rows[0];
			con.release();
			return user;
		} catch (err) {
			throw new Error(`unable to create user (${(u.firstname, u.lastname)}): ${err}`);
		}
	}

    // setting up model (index) to use it in routes

	async index(): Promise<User[]> {
		try {
			const con = await Client.connect();
			const sql = "SELECT * FROM users";
			const result = await con.query(sql);
			con.release();
			return result.rows;
		} catch (error) {
			throw new Error(`Couldn't find users, ${error}`);
		}
	}

	// setting up model (show) to use it in routes

	async show(id: number): Promise<User> {
		try {
			const con = await Client.connect();
			const sql = "SELECT * FROM users WHERE id=($1)";
			const result = await con.query(sql, [id]);
			con.release();
			return result.rows[0];
		} catch (error) {
			throw new Error(`Couldn't get user ${id}, ${error}`);
		}
	}

	// setting up model (authenticate) to use it for authentication

	async authenticate(firstname: string, lastname: string, password: string): Promise<User | null> {
        try {	
            const con = await Client.connect();
            const sql = "SELECT * FROM users WHERE firstname=($1) AND lastname=($2)";
            const result = await con.query(sql, [firstname, lastname]);
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt.compareSync(password + pepper, user.password)) {
                    return user;
                }
            }
            con.release();
            return null;
        } catch (error) {
		  throw new Error(`Unable to login, ${error}`);
		}
	}
}
