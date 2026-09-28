
-- AND --> every condition must be true
-- OR --> at least one condition must be true
-- NOT --> reverse the condition

-- SELECT * FROM products
-- WHERE price > 2000 AND category = 'Electronics';

-- SELECT * FROM products
-- WHERE NOT is_active = true;

SELECT * FROM products
WHERE NOT category = 'Electronics';

-- psql -U postgres -d postgres_first_db -f postgresSQL/queries_data_operations/and_or_not.sql