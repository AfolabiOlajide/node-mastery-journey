

-- calculate one result from many rows
-- COUNT() --> how many rows
-- SUM() --> sum of all values
-- AVG() --> average of all values
-- MIN() --> minimum value
-- MAX() --> maximum value

-- admin dashboards, reports, analytics, admin panels


SELECT 
    COUNT(*) total_posts,
    COUNT(*) FILTER (WHERE status = 'published') total_published_posts
FROM posts;

SELECT COUNT(*) total_posts, SUM(views) total_views, AVG(views) avg_views, MIN(views) min_views, MAX(views) max_views FROM posts;