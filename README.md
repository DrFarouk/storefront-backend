# Storefront Backend API Project


## Installing


```
npm install
```

## Migration

install db-migrate globally

```
npm install -g db-migrate
```

CREATE two databases one for production and one for testing

Using psql
```
psql -U username
# Enter Password
CREATE DATABASE POSTGRES_DATABASE_NAME_HERE;
CREATE DATABASE UNIT_TEST_POSTGRES_DATABASE_NAME_HERE;
```

Create a .env file for the database connection using the the template

```
# POSTGRES information here
PG_HOST=127.0.0.1
PG_DB=POSTGRES_DATABASE_NAME_HERE
PG_TEST_DB=UNIT_TEST_POSTGRES_DATABASE_NAME_HERE
PG_USER=POSTGRES_DATABASE_USERNAME_HERE
PG_PASSWORD=POSTGRES_DATABASE_PASSWORD_HERE
# user crypt here
BCRYPT_PASSWORD=PEPPER_PASSWORD_HERE
TOKEN_SECRET=JWT_SECRET_HERE
SALT_ROUNDS=10
# env mode here
ENV=dev

```
to use it in
```
{
	"dev": {
		"driver": "pg",
		"host": { "ENV": "PG_HOST" },
		"database": { "ENV": "PG_DB" },
		"user": { "ENV": "PG_USER" },
		"password": { "ENV": "PG_PASSWORD" }
	},
	"test": {
		"driver": "pg",
		"host": { "ENV": "PG_HOST" },
		"database": { "ENV": "PG_TEST_DB" },
		"user": { "ENV": "PG_USER" },
		"password": { "ENV": "PG_PASSWORD" }
	}
}
```

POSTGRES_HOST port will be  127.0.0.1

Then use the following command to migrate the tables automatically to your new database

```
db-migrate up
```

## Running the application

to run the application in watch mode:
```
npm run watch
```

to run the application in using node:
```
npm run start
```

The application will run on <http://localhost:4000/>

port 4000

## Unit testing

```
npm run test
```

## Endpoints

- in  [REQUIREMENTS.md](./REQUIREMENTS.md) file

## Database Schema

- in [REQUIREMENTS.md](./REQUIREMENTS.md) file