
-- null: unknown or missing value
-- empty string: known string value but it contains no characters
-- zero: actual numberic value of zero (0)

-- psql -U postgres -d postgres_first_db -f postgresSQL/foundations/null_empty_string_zero.sql

DROP TABLE IF EXISTS basics.value_examples;

CREATE TABLE basics.value_examples (
    id SERIAL PRIMARY KEY,
    nickname TEXT,
    bio TEXT,
    score INTEGER
);


INSERT INTO basics.value_examples (nickname, bio, score)
VALUES (NULL, 'Learning postgres', 10),
        ('', 'empty nick name', 20),
        ('olajide', '', 0),
        ('john', null, null);

-- SELECT * FROM basics.value_examples;

-- SELECT * FROM basics.value_examples WHERE nickname IS NULL; 
-- nickname IS NULL is not the same as nickname = NULL

-- SELECT * FROM basics.value_examples WHERE nickname = '';

SELECT * FROM basics.value_examples WHERE nickname IS NOT NULL;