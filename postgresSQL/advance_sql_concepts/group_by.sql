
-- group by creates groups of rows
-- group by can be used with aggregate functions
-- group by can be used with having clause
-- group by can be used with order by clause

--  WHERE --> filters normal rows before grouping
--  HAVING --> filters grouped rows


-- find authors who have written atleast 2 posts
SELECT 
    u.name AS author_name,
    COUNT(p.id) AS post_count,
    SUM(p.views) AS total_views
FROM users u
LEFT JOIN posts p
    ON u.id = p.user_id
GROUP BY u.name
HAVING COUNT(p.id) >= 2
ORDER BY post_count DESC;