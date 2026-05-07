-- Run this in MySQL Workbench or terminal if your table was created without created_at
-- Safe to run multiple times (uses IF NOT EXISTS logic)

USE digital_asset_tracker;

-- Add created_at column if it doesn't exist
ALTER TABLE financial_records
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Add user_id column if it doesn't exist  
ALTER TABLE financial_records
  ADD COLUMN IF NOT EXISTS user_id INT DEFAULT 1;

-- Verify the table structure
DESCRIBE financial_records;
