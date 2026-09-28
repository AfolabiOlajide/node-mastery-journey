
-- Constraints are database rules that limit the data that can be inserted into a table.
-- NOT NULL, UNIQUE, CHECK, DEFAULT
-- Database contraints are better than backend validation, even if you do backend validation ensure to still add database contraints.

DROP TABLE IF EXISTS basics.accounts;

CREATE TABLE basics.accounts (
    id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL ,
    email TEXT NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT true,
    age INTEGER CHECK (age >= 18),
    created_at TIMESTAMP DEFAULT NOW()  
);

INSERT INTO basics.accounts (full_name, email, age) 
VALUES ('John Doe', 'j@j.com', 26);


-- psql -U postgres -d postgres_first_db -f postgresSQL/foundations/constraints.sql