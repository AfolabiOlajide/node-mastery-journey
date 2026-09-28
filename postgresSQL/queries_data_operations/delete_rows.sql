-- INSERT INTO products (name, category, price, stock, sku, description)
-- VALUES ('temp products to be deleted', 'Electronics', 5000.99, 10, 'LPT-333', 'A computer');

-- SELECT name, category, price, stock
-- FROM products
-- WHERE sku = 'LPT-333';

DELETE FROM products
WHERE sku = 'LPT-333';

SELECT name, category, price, stock
FROM products
WHERE sku = 'LPT-333';