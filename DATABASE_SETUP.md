# Database Setup Guide

This guide will help you set up your Supabase database for the portfolio application.

## Prerequisites

1. A Supabase account and project
2. Your Supabase project URL and API keys

## Step 1: Set Up Environment Variables

Create a `.env.local` file in the root of your project (if it doesn't exist) and add the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

**Where to find these values:**

- Go to your Supabase project dashboard
- Navigate to **Settings** → **API**
- Copy the **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- Copy the **anon/public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Copy the **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Keep this secret!)

## Step 2: Run the Database Schema

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy the entire contents of `supabase/schema.sql`
5. Paste it into the SQL Editor
6. Click **Run** (or press `Ctrl+Enter` / `Cmd+Enter`)

This will create:

- `guestbook` table - for guestbook entries
- `watchlogs` table - for shows and books
- `projects` table - for project listings
- `content` table - for static content management
- `blog_posts` table - for blog posts (stores markdown content)
- `blog_categories` table - for blog categories
- `blog_authors` table - for blog authors
- `blog_post_categories` table - junction table for post categories
- Row Level Security (RLS) policies
- Indexes for performance

**Note:** The blog system uses markdown format. The `body` column in `blog_posts` stores markdown text.

## Step 3: Verify Tables Were Created

1. In Supabase dashboard, go to **Table Editor**
2. You should see the following tables:
   - `guestbook`
   - `watchlogs`
   - `projects`
   - `content`

## Step 4: (Optional) Seed Initial Data

If you want to populate the database with initial data:

1. Log into your admin panel at `/admin`
2. Go to **Settings**
3. Click **Seed Database** button

This will populate:

- Watchlogs (shows and books) from `data/showsData.ts`
- Projects from `data/projectData.ts`

## Troubleshooting

### Error: "Could not find the table 'public.watchlogs' in the schema cache"

**Solution:** The tables haven't been created yet. Make sure you've run the SQL schema in Step 2.

### Error: "Permission denied" or RLS errors

**Solution:**

- Make sure you've run the complete schema.sql file which includes RLS policies
- Verify that `SUPABASE_SERVICE_ROLE_KEY` is set correctly for admin operations
- Check that the RLS policies in schema.sql were created successfully

### Guestbook entries not saving

**Solution:**

- Verify the `guestbook` table exists
- Check that RLS policies allow public inserts (should be in schema.sql)
- Ensure `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set correctly

### Admin operations failing

**Solution:**

- Make sure `SUPABASE_SERVICE_ROLE_KEY` is set in your `.env.local`
- The service role key bypasses RLS and is required for admin operations
- Never expose the service role key in client-side code

## Security Notes

- ⚠️ **Never commit** `.env.local` to version control
- ⚠️ The **service role key** bypasses all RLS policies - keep it secret
- ✅ The **anon key** is safe to use in client-side code
- ✅ RLS policies ensure users can only read data and insert into guestbook

## Need Help?

If you encounter issues:

1. Check the browser console for error messages
2. Check the server logs (terminal where Next.js is running)
3. Verify all environment variables are set correctly
4. Ensure the database schema was run successfully
