-- Migration: Add calendar fields to tasks table
-- Date: 2026-02-09
-- Description: Adds due_date, recurrence_pattern, and recurrence_end_date columns
--              with appropriate constraints and indexes for calendar functionality

-- Add new columns
ALTER TABLE tasks
ADD COLUMN due_date TIMESTAMP NULL,
ADD COLUMN recurrence_pattern VARCHAR(20) NULL,
ADD COLUMN recurrence_end_date TIMESTAMP NULL;

-- Add partial index on due_date for performance (only for non-null values)
CREATE INDEX idx_tasks_due_date ON tasks(due_date) WHERE due_date IS NOT NULL;

-- Add CHECK constraint to ensure recurrence_pattern only allows valid values
ALTER TABLE tasks
ADD CONSTRAINT chk_recurrence_pattern
CHECK (recurrence_pattern IS NULL OR recurrence_pattern IN ('DAILY', 'WEEKLY', 'MONTHLY'));

-- Add CHECK constraint to ensure recurrence_end_date logic is valid
-- If recurrence_pattern is NULL, recurrence_end_date must be NULL
-- If recurrence_pattern is set, recurrence_end_date can be NULL or set
ALTER TABLE tasks
ADD CONSTRAINT chk_recurrence_end_date
CHECK (
    (recurrence_pattern IS NULL AND recurrence_end_date IS NULL) OR
    (recurrence_pattern IS NOT NULL)
);
