
-- one parent rows can have many child rows

-- example:
-- one user can have many posts
-- but one post can have only one user

-- post.user_id = user.id

-- show all posts with their authors
SELECT 
    users.name AS author_name,
    posts.title AS post_title,
    posts.status
FROM users
INNER JOIN posts
ON users.id = posts.user_id
ORDER BY users.name, posts.title;