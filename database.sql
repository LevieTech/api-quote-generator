
   
-- CREATE DATABASE "api-quotes"


-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "access_level" INT DEFAULT 0
);

CREATE TABLE categories (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(2000)
);

CREATE TABLE favorites (
	"id" SERIAL PRIMARY KEY,
	"category_id" INT REFERENCES "categories",
	"user_id" INT REFERENCES "user",
	"quotes" VARCHAR(40000)
);