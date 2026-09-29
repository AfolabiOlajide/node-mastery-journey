

-- aliases is going to make your queries shorter and easier to read

-- posts.title
-- i want to wrie like this p.title



SELECT 
    p.title AS post_title,
    p.status,
    p.views,
    u.name AS author_name,
    c.body AS comment_body
FROM posts p
INNER JOIN users u 
    ON p.user_id = u.id
LEFT JOIN comments c
    ON p.id = c.post_id
ORDER BY p.views DESC;