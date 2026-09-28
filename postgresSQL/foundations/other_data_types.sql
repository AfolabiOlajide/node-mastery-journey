

DROP TABLE IF EXISTS basics.app_events;

CREATE TABLE basics.app_events (
    -- able to use the gen_random_uuid() function due to enabling the pgcrypto extension
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
    event_name TEXT NOT NULL,
    -- jsonb is going to store json data (stores in a binary optimized format)
    -- used to handle and store flexible structrued data
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP DEFAULT NOW()
);

-- psql -U postgres -d postgres_first_db -f postgresSQL/foundations/other_data_types.sql

INSERT INTO basics.app_events (event_name, metadata) 
VALUES ('sign_up', '{"user_name": "olajide", "user_active": true}');

-- SLECT * FROM basics.app_events;

-- parsing json
-- ->> means open the column and get the value
SELECT event_name, metadata ->> 'user_name' AS user_name, metadata ->> 'user_active' AS user_active
FROM basics.app_events
WHERE metadata ? 'user_name' OR metadata ? 'user_active';