

-- running one query inside another query
-- sql runs the inner query first and then the outer query

-- get post with views performing greater than the average number of views
SELECT 'Posts Performing Above Average' AS message;
SELECT title, status, views FROM posts
WHERE posts.views > (
    SELECT AVG(views) FROM posts
)
ORDER BY posts.views DESC;

-- get post with views performing less than the average number of views
SELECT 'Posts Performing Below Average' AS message;
SELECT title, status, views FROM posts
WHERE posts.views < (
    SELECT AVG(views) FROM posts
)
ORDER BY posts.views DESC;