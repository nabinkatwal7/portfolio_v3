import { createClient } from "@/utils/supabase/server";
import { getBlogPosts, getGuestbookEntries, getWatchlogs, getProjects } from "@/app/actions/common";
import { DashboardStats } from "./components/DashboardStats";
import { RecentActivity } from "./components/RecentActivity";
import { QuickActions } from "./components/QuickActions";
import { RecentBlogPosts } from "./components/RecentBlogPosts";
import { RecentGuestbook } from "./components/RecentGuestbook";

export const dynamic = 'force-dynamic';

async function getStats() {
  const supabase = await createClient();

  const getCount = async (table: string) => {
    try {
      const { count } = await supabase.from(table).select('*', { count: 'exact', head: true });
      return count || 0;
    } catch {
      return 0;
    }
  };

  const [blogPosts, categories, authors, projects, watchlogs, guestbook] = await Promise.all([
    getCount('blog_posts'),
    getCount('blog_categories'),
    getCount('blog_authors'),
    getCount('projects'),
    getCount('watchlogs'),
    getCount('guestbook'),
  ]);

  return {
    blogPosts,
    categories,
    authors,
    projects,
    watchlogs,
    guestbook,
  };
}

async function getRecentActivity() {
  let posts: any[] = [];
  let guestbook: any[] = [];
  let watchlogs: any[] = [];
  let projects: any[] = [];

  try {
    [posts, guestbook, watchlogs, projects] = await Promise.all([
      getBlogPosts(),
      getGuestbookEntries(),
      getWatchlogs(),
      getProjects(),
    ]);
  } catch (error) {
    console.error('Error fetching activity data:', error);
  }

  const activities = [
    ...posts.slice(0, 3).map(post => ({
      id: post.id,
      type: 'blog' as const,
      title: post.title,
      timestamp: post.publishedAt || new Date().toISOString(),
      href: `/admin/blog/${post.id}`,
    })),
    ...guestbook.slice(0, 2).map((entry: any) => ({
      id: entry.id,
      type: 'guestbook' as const,
      title: `${entry.name}: ${entry.message.substring(0, 50)}...`,
      timestamp: entry.created_at,
      href: '/admin/guestbook',
    })),
    ...watchlogs.slice(0, 2).map((log: any) => ({
      id: log.id,
      type: 'watchlog' as const,
      title: log.title,
      timestamp: log.created_at,
      href: '/admin/watchlogs',
    })),
    ...projects.slice(0, 1).map((project: any) => ({
      id: project.id,
      type: 'project' as const,
      title: project.title,
      timestamp: project.created_at,
      href: '/admin/projects',
    })),
  ];

  // Sort by timestamp descending
  return activities.sort((a, b) =>
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  ).slice(0, 8);
}

export default async function AdminOverview() {
  let recentPosts: any[] = [];
  let recentGuestbook: any[] = [];

  try {
    const [posts, entries] = await Promise.all([
      getBlogPosts(),
      getGuestbookEntries(),
    ]);
    recentPosts = posts.slice(0, 5);
    recentGuestbook = entries.slice(0, 5);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  }

  const [stats, activities] = await Promise.all([
    getStats(),
    getRecentActivity(),
  ]);

  return (
    <div className="flex flex-col gap-8 max-w-6xl">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-medium text-[var(--color-text-main)]">
          Dashboard
        </h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          Overview of your portfolio content and statistics
        </p>
      </div>

      <DashboardStats stats={stats} />
      <QuickActions />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentBlogPosts posts={recentPosts} />
        <RecentGuestbook entries={recentGuestbook} />
      </div>

      <RecentActivity activities={activities} />
    </div>
  );
}
