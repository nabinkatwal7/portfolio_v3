-- Migration: Add SEO and CMS enhancement fields
-- Run this migration to add SEO fields to blog_posts table

-- Add SEO fields
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS og_image TEXT,
ADD COLUMN IF NOT EXISTS featured_image TEXT,
ADD COLUMN IF NOT EXISTS author TEXT DEFAULT 'Nabin Katwal',
ADD COLUMN IF NOT EXISTS reading_time INTEGER,
ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE;

-- Create index on published_at for better query performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);

-- Update published_at for existing published posts
UPDATE blog_posts 
SET published_at = created_at 
WHERE published = true AND published_at IS NULL;

-- Set published_at when publishing
CREATE OR REPLACE FUNCTION set_published_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.published = true AND NEW.published_at IS NULL THEN
    NEW.published_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_blog_posts_published_at
BEFORE INSERT OR UPDATE ON blog_posts
FOR EACH ROW
EXECUTE FUNCTION set_published_at();

-- Function to calculate reading time (words per minute = 200)
CREATE OR REPLACE FUNCTION calculate_reading_time(content_text TEXT)
RETURNS INTEGER AS $$
BEGIN
  RETURN GREATEST(1, CEIL(array_length(string_to_array(content_text, ' '), 1) / 200.0));
END;
$$ LANGUAGE plpgsql;
