-- IN ---> check if the value is present in the list of values
-- NOT IN ---> check if the value is not present in the list of values
-- BETWEEN ---> check if the value is present in the range of values
-- NOT BETWEEN ---> check if the value is not present in the range of values


-- SELECT name, category, price
-- FROM products
-- WHERE category IN ('Electronics', 'Kitchen');


-- SELECT name, category, price
-- FROM products
-- WHERE category NOT IN ('Electronics', 'Kitchen');


-- SELECT name, price
-- FROM products
-- WHERE price BETWEEN 100.00 AND 500.00; -- 100.00 <= price <= 500.00


SELECT name, price
FROM products
WHERE price NOT BETWEEN 100.00 AND 500.00; -- 100.00 <= price <= 500.00