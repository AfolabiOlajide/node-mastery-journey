
DROP TABLE IF EXISTS basics.products_basics;

CREATE TABLE basics.products_basics (
    id SERIAL PRIMARY KEY,
    -- VARCHAR means we have a string with maximum length of 100
    -- used when we want to enforce a maximum length
    name VARCHAR(100) NOT NULL,
    description TEXT,
    stock INTEGER DEFAULT 0,
    -- BIGINT means we want to store larger whole number than INTEGER
    total_views BIGINT DEFAULT 0,
    -- exact decial values
    -- 10 means total digits
    -- 2 means digits after the decimal point, 9999999.99
    price NUMERIC(10, 2),
    is_active BOOLEAN DEFAULT true
);

-- queries

INSERT INTO basics.products_basics (name, description, stock, total_views, price, is_active)
VALUES ('Laptop', 'A computer', 10, 10000, 5000.99, true),
       ('Phone', 'A mobile device', 5, 5000, 2999.99, true),
       ('Tablet', 'A tablet device', 3, 3000, 1999.99, false);

SELECT * FROM basics.products_basics;

SELECT id, name, price, is_active FROM basics.products_basics WHERE is_active = true;

-- psql -U postgres -d postgres_first_db -f postgresSQL/foundations/data_types.sql