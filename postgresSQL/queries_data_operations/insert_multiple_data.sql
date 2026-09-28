-- INSERT INTO products (name, category, price, stock, sku, description)
-- VALUES ('Laptop 01', 'Electronics', 5000.99, 10, 'LPT-127', 'A computer'),
--         ('Laptop 02', 'Electronics', 5000.99, 10, 'LPT-128', 'A computer'),
--         ('Laptop 03', 'Electronics', 5000.99, 10, 'LPT-129', 'A computer');


SELECT name, category, price, stock, sku
FROM products
WHERE sku IN ('LPT-127', 'LPT-128', 'LPT-129');


-- psql -U postgres -d postgres_first_db -f postgresSQL/queries_data_operations/insert_multiple_data.sql