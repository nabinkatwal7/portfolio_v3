# Portfolio V3 Documentation

## Project Overview

Portfolio V3 is a modern, high-performance personal portfolio website built with Next.js 15, Supabase, and Tailwind CSS.
It features a clean, professional design with interactive animations and a comprehensive management system for blog
posts, projects, and site content.

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Server Actions)
- **Database & Auth:** [Supabase](https://supabase.com/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/), [Motion](https://motion.dev/) (Framer Motion)
- **Content:** Markdown-based blog system
- **Deployment:** [Vercel](https://vercel.com/)
- **Editor:** [Monaco Editor](https://microsoft.github.io/monaco-editor/) (for Playground)
- **UI Components:** [Headless UI](https://headlessui.com/), [React Icons](https://react-icons.github.io/react-icons/)

## Project Structure

```text
├── app/                  # Next.js App Router
│   ├── (admin)/          # Admin panel routes (protected)
│   ├── (site)/           # Public site routes
│   ├── actions/          # Next.js Server Actions (Database logic)
│   ├── api/              # API routes (if any)
│   └── studio/           # Content Studio (Sanity-like interface)
├── components/           # React Components
│   ├── admin/            # Admin-specific components
│   ├── blog/             # Blog-related components
│   ├── common/           # Shared components (Header, Footer, Animations)
│   ├── home/             # Home page sections
│   ├── playground/       # Code playground components
│   └── ui/               # Reusable UI primitives (Aceternity UI, etc.)
├── data/                 # Static data and seed files
├── services/             # External service integrations (e.g., Piston API)
├── supabase/             # Database schema and migrations
├── types/                # TypeScript type definitions
└── utils/                # Utility functions (Supabase client, Motion variants)
```

## Features

### Public Site

- **Dynamic Hero Section:** Interactive background effects and engaging copy.
- **Blog System:**
    - Markdown support with syntax highlighting.
    - Categorization and author management.
    - Read time estimation and publication dates.
- **Project Showcase:** List of featured projects with tags and links.
- **Guestbook:** Interactive space for visitors to leave messages.
- **Watchlogs:** Personal tracking for shows and books being consumed.
- **Code Playground:** Live code editor and preview using Monaco Editor and Piston API.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop.
- **Theme Support:** Dark and light mode with system preference detection.

### Admin Panel (`/admin`)

- **Dashboard:** Overview of site statistics and recent activity.
- **Blog Management:** Full CRUD operations for posts, categories, and authors.
- **Project Management:** Manage featured projects.
- **Guestbook Moderation:** View and manage visitor messages.
- **Site Settings:** Update site-wide content and configuration.
- **Seed System:** Ability to seed the database with initial data.

## Database Schema

The project uses Supabase (PostgreSQL) with the following primary tables:

- `blog_posts`: Stores blog content (Markdown), metadata, and publication status.
- `blog_categories`: Managed categories for blog organization.
- `blog_authors`: Information about blog contributors.
- `projects`: Data for featured portfolio projects.
- `guestbook`: Visitor messages and timestamps.
- `watchlogs`: Entries for tracked media (shows, books).
- `content`: Key-value store for manageable site text (hero, about sections).

Detailed schema can be found in `supabase/schema.sql`.

## Authentication

Admin access is protected via a simple password-based session system:

- **Admin Password:** Defined in environment variables (`ADMIN_PASSWORD`).
- **Session:** Managed via a secure, `httpOnly` cookie (`admin_session`).
- **Security:** Server Actions check for the presence of the session cookie before performing sensitive operations.

## Development and Setup

1. **Clone the repository.**
2. **Install dependencies:** `npm install`.
3. **Environment Variables:** Create a `.env.local` file with:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ADMIN_PASSWORD=your_admin_password
   ```
4. **Database Setup:** Follow the instructions in `DATABASE_SETUP.md` to run the schema in Supabase.
5. **Run Development Server:** `npm run dev`.

## Deployment

The project is optimized for deployment on **Vercel**. Ensure all environment variables are correctly configured in the
Vercel dashboard.
