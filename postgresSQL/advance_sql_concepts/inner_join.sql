

-- inner join retruns only the matching rows from both tables

SELECT
    users.name AS author_name,
    posts.title AS post_title,
    posts.status,
    posts.views
FROM posts -- destination table
INNER JOIN users -- source table
ON posts.user_id = users.id -- join condition (MATCHING RULE)
WHERE posts.status = 'published'
ORDER BY posts.views DESC;