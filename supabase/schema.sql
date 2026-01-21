
-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- 1. Guestbook Table
create table guestbook (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Watchlogs Table
create table watchlogs (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  src text not null, -- URL or path to image
  type text not null check (type in ('shows', 'books')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Projects Table
create table projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  image text not null,
  link text not null,
  tags text[] not null default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Content Table (for static text management)
create table content (
  key text primary key,
  value text not null,
  section text not null, -- e.g., 'hero', 'about'
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Policies (Row Level Security)
-- For now, we will enable read access for everyone, and write access only for service role (or admin via app logic)
-- Since we are using a custom admin password check in the app, we can keep RLS open for read and restrict write?
-- Better: Enable RLS. Allow SELECT for anon. API logic will bypass RLS for writes or we use a signed-in user if we implemented Auth.
-- But since we are doing "simple auth" with a password, the server actions will use the service role key or we just allow anon insert for guestbook?
-- Guestbook needs public insert.

alter table guestbook enable row level security;
create policy "Enable read access for all users" on guestbook for select using (true);
create policy "Enable insert for all users" on guestbook for insert with check (true);
create policy "Enable delete for authenticated users only" on guestbook for delete using (false); -- We will handle delete via server action bypass or admin check

alter table watchlogs enable row level security;
create policy "Enable read access for all users" on watchlogs for select using (true);

alter table projects enable row level security;
create policy "Enable read access for all users" on projects for select using (true);

alter table content enable row level security;
create policy "Enable read access for all users" on content for select using (true);

-- 5. Blog Categories Table
create table blog_categories (
  id uuid default uuid_generate_v4() primary key,
  title text not null unique,
  slug text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Blog Authors Table
create table blog_authors (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  image text,
  bio text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. Blog Posts Table
create table blog_posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  body text not null, -- Markdown content
  main_image text,
  main_image_alt text,
  author_id uuid references blog_authors(id) on delete set null,
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. Blog Post Categories Junction Table
create table blog_post_categories (
  post_id uuid references blog_posts(id) on delete cascade,
  category_id uuid references blog_categories(id) on delete cascade,
  primary key (post_id, category_id)
);

-- RLS Policies for Blog Tables
alter table blog_categories enable row level security;
create policy "Enable read access for all users" on blog_categories for select using (true);

alter table blog_authors enable row level security;
create policy "Enable read access for all users" on blog_authors for select using (true);

alter table blog_posts enable row level security;
create policy "Enable read access for all users" on blog_posts for select using (true);

alter table blog_post_categories enable row level security;
create policy "Enable read access for all users" on blog_post_categories for select using (true);

-- Indexes for performance
create index idx_guestbook_created_at on guestbook(created_at desc);
create index idx_watchlogs_type on watchlogs(type);
create index idx_blog_posts_slug on blog_posts(slug);
create index idx_blog_posts_published_at on blog_posts(published_at desc);
create index idx_blog_posts_author_id on blog_posts(author_id);
create index idx_blog_categories_slug on blog_categories(slug);
