
-- like -- case sensitive pattern match
-- ilike -- case insensitive pattern match
-- % -- any number of characters
-- _ -- any single character


-- SELECT name, price
-- FROM products
-- WHERE name LIKE 'Laptop%'; -- % means any number of characters can come after it

SELECT name, category, price
FROM products
WHERE category ILIKE '%sup%'; -- % means any number of characters can come after it