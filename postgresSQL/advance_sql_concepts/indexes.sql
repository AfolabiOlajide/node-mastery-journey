

-- indexes helps postgres find rows (data) faster
-- speeds up query reading process
-- indexes are created on columns that are most frequently used in queries


SELECT id, title, status, views, user_id
FROM posts;

-- /posts?status=published
SELECT id, title, status
FROM posts
WHERE status = 'published';

-- idx_posts_status
-- idx - index
-- posts - table name
-- status - column
CREATE INDEX IF NOT EXISTS idx_posts_status 
ON posts (status);


SELECT title, status, views
FROM posts
WHERE status = 'published'
ORDER BY views DESC;

-- composite index

CREATE INDEX IF NOT EXISTS idx_posts_status_views 
ON posts (status, views DESC);


-- /users/:id/posts
SELECT title, status, views
FROM posts
WHERE user_id = (
    SELECT id
    FROM users
    WHERE name = 'John Doe'
);

-- idx_users_id
CREATE INDEX IF NOT EXISTS idx_posts_user_id
ON posts (user_id);