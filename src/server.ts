// import Express to run server and routes
import express, { Request, Response } from 'express'

import bodyParser from 'body-parser'

import products_routes from "./routes/products";
import users_routes from "./routes/users";
import orders_routes from "./routes/orders";

// Start up an instance of app
const app: express.Application = express()
const address: string = "0.0.0.0:4000"

app.use(bodyParser.json())

/* Setup Main Route */
app.get('/', function (req: Request, res: Response) {
    res.send("Welcome to my store")
})

/* Setup Routes */
products_routes(app);
users_routes(app);
orders_routes(app);

/* Setup Server */
app.listen(4000, function () {
    console.log(`starting app on: ${address}`)
})

export default app;