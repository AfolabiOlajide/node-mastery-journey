
-- Foreign key: is a column that references the primary key of another table
-- foreign key is a unique index


-- users.id --> primary key
-- posts.user_id --> foreign key
-- every post you will create must belong to an existing user


SELECT id, name
FROM users;

SELECT id, user_id, title
FROM posts;