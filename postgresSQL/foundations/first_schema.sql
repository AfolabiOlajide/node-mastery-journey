-- db --> schema --> tables --> rows

-- if not exists is going to prevent an error if the schema already exists
CREATE SCHEMA IF NOT EXISTS basics;


CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- query

SELECT schema_name
FROM information_schema.schemata
ORDER BY schema_name;

-- psql -U postgres -d postgres_first_db -f postgresSQL/foundations/first_schema.sql