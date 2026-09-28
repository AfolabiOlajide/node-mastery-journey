
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    stock INTEGER NOT NULL CHECK (stock >= 0) DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sku TEXT UNIQUE,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO products (name, category, price, stock, is_active, sku, description) 
VALUES
    ('AeroGrip Wireless Mouse', 'Electronics', 49.99, 120, true, 'ELEC-MOU-001', 'Ergonomic 2.4GHz wireless mouse with silent clicks.'),
    ('ProMechanical Keyboard', 'Electronics', 129.50, 45, true, 'ELEC-KEY-002', 'Hot-swappable RGB mechanical keyboard with brown switches.'),
    ('UltraHD 27-inch Monitor', 'Electronics', 299.99, 30, true, 'ELEC-MON-003', '4K IPS display featuring HDR400 and USB-C power delivery.'),
    ('Noise-Canceling ANC Headphones', 'Electronics', 199.00, 55, true, 'ELEC-AUD-004', 'Over-ear headphones with active noise cancellation and 40h battery.'),
    ('FastCharge 65W GaN Charger', 'Electronics', 35.00, 150, true, 'ELEC-PWR-005', 'Compact dual USB-C and USB-A fast wall adapter.'),
    ('Ceramic Pour-Over Dripper', 'Kitchen', 24.00, 75, true, 'KIT-DRP-001', 'Handcrafted ceramic coffee dripper for manual brewing.'),
    ('Cast Iron Skillet (10-inch)', 'Kitchen', 39.95, 60, true, 'KIT-SKI-002', 'Pre-seasoned heavy-duty cast iron skillet for all cooktops.'),
    ('Stainless Steel Chef Knife (8-inch)', 'Kitchen', 54.00, 40, true, 'KIT-KNF-003', 'High-carbon Japanese steel blade with balanced bolster.'),
    ('Double-Wall French Press', 'Kitchen', 32.50, 80, true, 'KIT-PRS-004', 'Insulated 34oz stainless steel coffee and tea press.'),
    ('Digital Food Kitchen Scale', 'Kitchen', 19.99, 130, true, 'KIT-SCL-005', 'High-precision sensor scale measuring in grams and ounces.'),
    ('Merino Wool Crewneck Sweater', 'Apparel', 88.00, 40, true, 'APP-SWE-001', '100% extra-fine merino wool knitted crewneck in charcoal.'),
    ('Heavyweight Cotton Hoodie', 'Apparel', 65.00, 85, true, 'APP-HOD-002', '450 GSM brushed fleece hoodie with double-lined hood.'),
    ('Active Dry Fit Running Shorts', 'Apparel', 34.50, 110, true, 'APP-SHO-003', 'Lightweight 5-inch inseam athletic shorts with zip pocket.'),
    ('Waterproof Trail Windbreaker', 'Apparel', 95.00, 35, true, 'APP-JKT-004', 'Ripstop nylon packable shell with taped seams.'),
    ('Seamless Everyday Crew Socks (3-Pack)', 'Apparel', 16.00, 220, true, 'APP-SOX-005', 'Combed cotton blend with reinforced heel and arch support.'),
    ('Hardcover Dotted Journal', 'Stationery', 18.50, 200, true, 'STA-JOU-001', 'A5 notebook with 160gsm bleed-proof paper and ribbon marker.'),
    ('Brass Retractable Ballpoint', 'Stationery', 28.00, 95, true, 'STA-PEN-002', 'Solid machined brass pen compatible with standard refills.'),
    ('Minimalist Aluminum Desk Mat', 'Stationery', 42.00, 50, true, 'STA-MAT-003', 'Anodized aluminum mouse and desk pad with non-slip base.'),
    ('Archival Drawing Ink Set', 'Stationery', 22.00, 65, true, 'STA-INK-004', 'Set of 6 waterproof pigmented acrylic drawing inks.'),
    ('Adjustable Steel Bookstand', 'Stationery', 26.50, 90, true, 'STA-STD-005', 'Multi-angle foldable metal stand for books and tablets.');


SELECT * FROM products;
-- psql -U postgres -d postgres_first_db -f postgresSQL/queries_data_operations/sql_concepts_base_file.sql