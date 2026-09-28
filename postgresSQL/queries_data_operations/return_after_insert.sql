
-- returning usually returns back the rows immediately after insert, update or delete

-- INSERT INTO products (name, category, price, stock, is_active, sku, description)
-- VALUES ('Bike Helmet', 'Apparel', 45.00, 10, true, 'APP-HEL-001', 'Full-fledged motorcycle helmet with LED lights.')
-- RETURNING id, name, category, price, stock, created_at;

-- UPDATE products
-- SET price = 59.99, stock = 34
-- WHERE sku = 'APP-HEL-001'
-- RETURNING id, name, category, price, stock, created_at;

DELETE FROM products
WHERE sku = 'APP-HEL-001'
RETURNING id, name, category, price, stock, created_at;