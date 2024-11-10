
## API Endpoints

#### Products:

| Endpoint          | Request    | Parameters                    | Requires Token | Usage                  |
| ----------------- | ---------- | ----------------------------- | -------------- | ---------------------- |
| **/products**     | **POST**   | **name, price**               | **True**       | **Create product**     |
| **/products**     | **GET**    | **N/A**                       | **False**      | **List products**      |
| **/products/:id** | **GET**    | **id**                        | **False**      | **Load product by Id** |

#### Users:

| Endpoint         | Request    | Parameters                            | Requires Token | Usage               |
| ---------------- | ---------- | ------------------------------------- | -------------- | ------------------- |
| **/users**       | **POST**   | **firstname, lastname, password**     | **False**      | **Create User**     |
| **/users**       | **GET**    | **N/A**                               | **True** \*    | **List Users**      |
| **/users/:id**   | **GET**    | **id**                                | **True** \*    | **Load user by Id** |
| **/users/login** | **POST**   | **firstname, lastname, password**     | **False**      | **Logs user in**    |

#### Orders:

| Endpoint                 | Request    | Parameters                   | Requires Token | Usage                    |
| ------------------------ | ---------- | ---------------------------- | -------------- | ------------------------ |
| **/orders**              | **POST**   | **status, user_id**          | **True** \*    | **Create order**         |
| **/orders/:user_id**     | **GET**    | **user_id**                  | **True** \*    | **List user open orders**|


## Database Schema

#### Product

| Field        | Type             | Special Attributes |
| ------------ | ---------------- | ------------------ |
| **id**       | **Serial**       | **Primay Key**     |
| **name**     | **Varchar(70)**  | **N/A**            |
| **price**    | **Integer**      | **N/A**            |

#### User

| Field               | Type             | Special Attributes |
| ------------------- | ---------------- | ------------------ |
| **id**              | **Serial**       | **Primay Key**     |
| **firstname**       | **Varchar(50)**  | **N/A**            |
| **lastname**        | **Varchar(50)**  | **N/A**            |
| **password**        | **Varchar**      | **N/A**            |

#### Orders

| Field       | Type             | Special Attributes |
| ----------- | ---------------- | ------------------ |
| **id**      | **Serial**       | **Primay Key**     |
| **user_id** | **Varchar(100)** | **Foreign Key**    |
| **status**  | **Varchar(20)**  | **N/A**            |

#### Orders_Products

| Field          | Type             | Special Attributes |
| -------------- | ---------------- | ------------------ |
| **id**         | **Serial**       | **Primay Key**     |
| **order_id**   | **Varchar(100)** | **Foreign Key**    |
| **product_id** | **Varchar(100)** | **Foreign Key**    |
| **quantity**   | **Integer**      | **N/A**            |
