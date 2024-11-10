// import dotEnv to Setup environment
import dotenv from "dotenv";

import { Pool } from "pg";

// intreduce configuration for environment
dotenv.config();

// import variables from environment
const { PG_HOST, PG_DB, PG_TEST_DB, PG_USER, PG_PASSWORD, ENV } = process.env;

// put environment variables in config
const clientConfig = {
	host: PG_HOST,
	database: ENV === "dev" ? PG_DB : PG_TEST_DB,
	user: PG_USER,
	password: PG_PASSWORD,
};

const Client = new Pool(clientConfig);

export default Client;
