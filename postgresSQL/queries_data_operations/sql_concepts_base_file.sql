
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    stock INTEGER NOT NULL CHECK (stock >= 0) DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sku TEXT UNIQUE,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO products (name, category, price, stock, is_active, sku, description)
VALUES ('Laptop', 'Electronics', 5000.99, 10, true, 'LPT-123', 'A computer'),
       ('Phone', 'Electronics', 2999.99, 5, true, 'PHN-456', 'A mobile device'),
       ('Tablet', 'Electronics', 1999.99, 3, false, 'TBL-789', 'A tablet device'),
       ('Book', 'Books', 9.99, 50, true, 'BK-123', 'A book'),
       ('Pen', 'Office Supplies', 1.99, 100, true, 'PN-456', 'A pen'),
       ('Pencil', 'Office Supplies', 0.99, 200, true, 'PC-789', 'A pencil'),
       ('Mouse', 'Electronics', 49.99, 20, true, 'MS-123', 'A mouse'),
       ('Keyboard', 'Electronics', 79.99, 15, true, 'KB-456', 'A keyboard'),
       ('Monitor', 'Electronics', 599.99, 8, true, 'MN-789', 'A monitor');


SELECT * FROM products;
-- psql -U postgres -d postgres_first_db -f postgresSQL/queries_data_operations/sql_concepts_base_file.sql