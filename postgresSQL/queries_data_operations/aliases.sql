
-- AS creates an alias for the output of the column name
-- makes the col name easier to read

SELECT name AS product_name, price AS product_price
FROM products;


-- psql -U postgres -d postgres_first_db -f postgresSQL/queries_data_operations/aliases.sql