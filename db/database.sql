CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--DROP DATABASE petsdb
--CREATE DATABASE petsdb;
--dropdb -U postgres testdb
--createdb -U postgres petsdb


CREATE TABLE users(
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL UNIQUE,
  is_admin BOOLEAN NOT NULL DEFAULT false,
  user_password TEXT NOT NULL
);

SELECT * FROM users;

INSERT INTO users (user_name,user_email,user_password) VALUES ('Bob','bob@email.com','bob');


CREATE TABLE transactions(
  record_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  record_date DATE NOT NULL,
  t_description TEXT NOT NULL,
  t_type TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  direction TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL,
  submitted_date_time DATE NOT NULL,
  submitted_user TEXT NOT NULL,
  deleted BOOLEAN NOT NULL DEFAULT false,
  parent_record_id TEXT
);

SELECT * FROM transactions;

INSERT INTO transactions (record_date,t_description,t_type, category,subcategory,direction,amount,currency,submitted_date_time,submitted_user)
       VALUES ('2022-03-22','simple descrip','def type','def cat','def subcat','to dima direc',100.5,'UAH','2022-03-23','MAXIM');

CREATE TABLE categories(
  record_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  subcategory TEXT NOT NULL,
  t_type TEXT NOT NULL,
  c_description TEXT NOT NULL
);

--psql -U postgres
--\c petsdb
--\dt
--heroku pg:psql