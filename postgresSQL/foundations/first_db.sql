-- write comment in sql using --

-- this should never be done in production
-- this is only for learning
DROP DATABASE IF EXISTS postgres_first_db;

-- create a new db inside your postgres server
CREATE DATABASE postgres_first_db;


-- psql: is the posgres command line tool
-- -U: we are loging in as a user postgres
-- -d: connect to our database postgres
-- -f: run the sql command from this file
-- psql -U postgres -d postgres -f postgresSQL/foundations/first_db.sql

-- SELECT current_database(); This returns the current database
-- SELECT current_user; This returns the current user
-- SELECT version(); returns the version of the installed postgres database
-- \l: list all databases
-- \dt: list all tables
-- \du: list all users
-- \q or exit: to quit