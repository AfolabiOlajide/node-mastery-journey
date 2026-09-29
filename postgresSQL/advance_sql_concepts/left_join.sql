
-- Left join --> returns all the records from the left table, even if there is no match in the right table
-- if the right table has matching data, postgres includes it in the result
-- if the right table does not have matching data, postgres returns null

-- posts --> left table
-- comments --> right table


SELECT 
    posts.title AS post_title,
    comments.body
FROM posts
LEFT JOIN comments
ON posts.id = comments.post_id
ORDER BY posts.title;

-- vs inner join
-- SELECT 
--     posts.title AS post_title,
--     comments.body
-- FROM posts
-- INNER JOIN comments
-- ON posts.id = comments.post_id
-- ORDER BY posts.title;