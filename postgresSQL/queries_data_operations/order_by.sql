-- ASC: ascending order
-- DESC: descending order


-- SELECT name, price
-- FROM products
-- ORDER BY price DESC;


-- SELECT name, price
-- FROM products
-- WHERE category = 'Electronics'
-- ORDER BY price ASC;


SELECT name, category, price
FROM products
ORDER BY category ASC, price DESC;
-- you do not use the AND keyword here to combine sorting instead use commas

