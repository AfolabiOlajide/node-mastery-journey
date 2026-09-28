

DROP TABLE IF EXISTS basics.students;

CREATE TABLE basics.students (
    -- serial is going to create an auto incrementing primary key
    -- primary key means that this column is going to be unique and identifies each row
    id SERIAL PRIMARY KEY,
    -- NOT NULL means that this column is required
    -- TEXT means that this column is a string
    name TEXT NOT NULL,
    -- UNIQUE means that this column is unique
    email TEXT NOT NULL UNIQUE,
    age INTEGER CHECK (age >= 18),
    -- timestamp means that this column stores a date and time format
    -- default means that this column has a default value if nothing is provided
    created_at TIMESTAMP DEFAULT NOW()
);

-- psql -U postgres -d postgres_first_db -f postgresSQL/foundations/first_table.sql
-- \dt basics.*

-- Insert some data (query)
INSERT INTO basics.students (name, email, age)
-- use single quotes not double quotes for strings
VALUES ('olajide', 'olajide@example.com', 20), ('samuel', 'samuel@example.com', 19), ('doe', 'doe@example.com', 35);