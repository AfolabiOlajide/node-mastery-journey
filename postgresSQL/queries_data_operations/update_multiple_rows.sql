SELECT name, category, price, is_active
FROM products
WHERE category = 'Electronics';


UPDATE products
SET price = ROUND(price * 1.1, 2)
WHERE category = 'Electronics';


SELECT name, category, price, is_active
FROM products
WHERE category = 'Electronics';


-- mark products as inactive if they are out of stock
-- UPDATE products
-- SET is_active = false
-- WHERE stock = 0;