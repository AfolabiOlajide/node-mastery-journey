
-- limit: how many rows to return
-- offset: how many rows to skip

-- SELECT name, price
-- FROM products
-- ORDER BY price ASC
-- LIMIT 5;

-- pagination: page1 1 (1-5), page2 6 (6-10), page3 11 (11-15) 
-- offset 0: do not skip anything,
-- offset 5: skip first 5 rows,
-- offset 10: skip first 10 rows

SELECT name, price
FROM products
ORDER BY price ASC
LIMIT 5
OFFSET 10;

-- offset calculation
-- (page - 1) * limit