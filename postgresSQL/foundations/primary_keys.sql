

-- Primary key: uniquely identifies each row
-- primary key is a unique index

DROP TABLE IF EXISTS basics.sales;

CREATE TABLE basics.sales (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO basics.sales (title, price) 
VALUES ('Laptop', 5000), ('Phone', 3000), ('Tablet', 2000);

-- SELECT * FROM basics.sales;

-- SELECT * FROM basics.sales WHERE id = 39;

INSERT INTO basics.sales (id, title, price) 
VALUES (2, 'Book', 50);

-- psql -U postgres -d postgres_first_db -f postgresSQL/foundations/primary_keys.sql