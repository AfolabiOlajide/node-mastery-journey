

-- one post can have multiple tags
-- and one tag can belong to multiple posts

-- posts.id === poast_tags.post_id
-- tags.id === post_tags.tag_id


-- show all posts with their tags
SELECT 
    posts.title AS post_title,
    tags.name AS tag_name
FROM posts
INNER JOIN post_tags
    ON posts.id = post_tags.post_id
INNER JOIN tags
    ON post_tags.tag_id = tags.id
ORDER BY posts.title, tags.name;