SELECT name, price, stock, sku
FROM products
WHERE sku = 'ELEC-MOU-001';


UPDATE products 
SET price = 59.99, stock = 34
WHERE sku = 'ELEC-MOU-001';


SELECT name, price, stock, sku
FROM products
WHERE sku = 'ELEC-MOU-001';
