
-- allows you to run multiple sql statements as one safe unit


BEGIN TRANSACTION; -- this starts a transaction

SELECT title, status, views
FROM posts
WHERE title = 'This is a post on SQL databases';

UPDATE posts
SET status = 'published'
WHERE title = 'This is a post on SQL databases'
    AND status = 'draft';

UPDATE posts
SET views = views + 1
WHERE title = 'This is a post on SQL databases';

SELECT title, status, views
FROM posts
WHERE title = 'This is a post on SQL databases';

COMMIT; -- this commits the transaction and saves the changes