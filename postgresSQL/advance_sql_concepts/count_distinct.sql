

-- counts unique values

-- how many unique post are connected to each tag

SELECT 
    t.name as tag_name,
    COUNT(DISTINCT p.id) as total_unique_posts
FROM tags t
LEFT JOIN post_tags pt
    ON t.id = pt.tag_id
LEFT JOIN posts p
    ON pt.post_id = p.id
GROUP BY t.name
ORDER BY total_unique_posts DESC;