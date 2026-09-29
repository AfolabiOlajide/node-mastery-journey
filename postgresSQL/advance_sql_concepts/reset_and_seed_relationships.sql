

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TABLE IF EXISTS post_tags;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL
);

CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users (id),
    title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    views INTEGER NOT NULL DEFAULT 0 CHECK (views >= 0)
);

CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES posts (id),
    body TEXT NOT NULL
);

CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE post_tags (
    post_id UUID NOT NULL REFERENCES posts (id),
    tag_id UUID NOT NULL REFERENCES tags (id),
    PRIMARY KEY (post_id, tag_id) -- composite primary key 
);


-- SEEDING DATA 
-- users
INSERT INTO users (name) VALUES ('John Doe'), ('Jane Doe');

-- posts
INSERT INTO posts (user_id, title, status, views)
SELECT id, 'This is a database post', 'published', 100
FROM users
WHERE name = 'John Doe';

INSERT INTO posts (user_id, title, status, views)
SELECT id, 'This is a post on SQL databases', 'draft', 0
FROM users
WHERE name = 'John Doe';

INSERT INTO posts (user_id, title, status, views)
SELECT id, 'Postgres is great', 'published', 236
FROM users
WHERE name = 'Jane Doe';

-- comments
INSERT INTO comments (post_id, body)
SELECT id, 'Great post!'
FROM posts
WHERE title = 'Postgres is great';

INSERT INTO comments (post_id, body)
SELECT id, 'Thanks for the post!'
FROM posts
WHERE title = 'This is a database post';

-- tags
INSERT INTO tags (name)
VALUES ('postgres'), ('sql'), ('database');

-- post_tags
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id
FROM posts p, tags t
WHERE p.title = 'Postgres is great' AND t.name = 'postgres';

INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id
FROM posts p, tags t
WHERE p.title = 'Postgres is great' AND t.name = 'database';

INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id
FROM posts p, tags t
WHERE p.title = 'This is a database post' AND t.name = 'database';

INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id
FROM posts p, tags t
WHERE p.title = 'This is a post on SQL databases' AND t.name = 'sql';

SELECT 'Database reset and sample data inserted successfully.' AS message;