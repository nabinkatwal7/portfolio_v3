
import { addProject, deleteProject } from "@/app/actions/admin";
import { getProjectsPaginated } from "@/app/actions/common";
import { Pagination } from "@/components/common/Pagination";

export const dynamic = 'force-dynamic';

export default async function AdminProjects({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);
  const { data: projects, totalPages, total } = await getProjectsPaginated(currentPage, 20);

  return (
    <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold font-[var(--font-syne)] text-[var(--color-primary)]">Projects</h1>
          <p className="text-[var(--color-text-muted)]">Manage your project portfolio</p>
        </div>

        <div className="p-8 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10">
            <h3 className="font-bold mb-6 text-lg text-[var(--color-text-main)]">Add New Project</h3>
            <form action={addProject} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      name="title"
                      placeholder="Project Title"
                      required
                      className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors"
                    />
                    <input
                      name="link"
                      placeholder="Project Link (URL)"
                      required
                      className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors"
                    />
                </div>
                <textarea
                  name="description"
                  placeholder="Description"
                  required
                  className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 h-28 text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors resize-none"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      name="image"
                      placeholder="Image URL"
                      required
                      className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors"
                    />
                    <input
                      name="tags"
                      placeholder="Tags (comma separated)"
                      className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors"
                    />
                </div>
                <button
                  type="submit"
                  className="self-end bg-[var(--color-primary)] text-white rounded-lg px-6 py-3 hover:opacity-90 transition-opacity font-medium"
                >
                  Add Project
                </button>
            </form>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[var(--color-text-main)]">All Projects</h2>
            <span className="text-sm text-[var(--color-text-muted)]">
              {total} {total === 1 ? 'project' : 'projects'}
            </span>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {projects.length === 0 ? (
                <div className="col-span-full p-12 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 text-center">
                  <p className="text-[var(--color-text-muted)] opacity-60">No projects yet. Add your first project!</p>
                </div>
              ) : (
                projects.map((project: any) => (
                  <div key={project.id} className="flex gap-5 p-5 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 group hover:border-[var(--color-primary)]/20 hover:bg-[var(--color-primary)]/10 transition-all">
                      <div className="w-36 h-28 rounded-lg overflow-hidden bg-black/20 shrink-0 border border-[var(--color-primary)]/10">
                           <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col gap-3">
                          <div className="flex justify-between items-start gap-3">
                               <h3 className="font-bold text-lg text-[var(--color-text-main)]">{project.title}</h3>
                                <form action={async () => {
                                    'use server'
                                    await deleteProject(project.id)
                                }}>
                                   <div className="flex items-center gap-2">
                                      <a
                                        href={`/admin/projects/${project.id}`}
                                        className="text-xs text-[var(--color-primary)] bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/20 px-3 py-1.5 rounded-lg transition-colors font-medium"
                                      >
                                        Edit
                                      </a>
                                      <button
                                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-1.5 rounded-lg text-xs transition-colors font-medium"
                                      >
                                        Delete
                                      </button>
                                   </div>
                                </form>
                          </div>
                          <p className="text-sm opacity-70 line-clamp-2 flex-1 text-[var(--color-text-main)]">{project.description}</p>
                          <div className="flex gap-2 flex-wrap">
                              {project.tags?.map((tag: string) => (
                                  <span key={tag} className="text-xs bg-[var(--color-primary)]/10 px-2.5 py-1 rounded-full text-[var(--color-primary)]">
                                    {tag}
                                  </span>
                              ))}
                          </div>
                      </div>
                  </div>
                ))
              )}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/admin/projects"
            />
          )}
        </div>
    </div>
  );
}
