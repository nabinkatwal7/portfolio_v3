
import { addProject, deleteProject } from "@/app/actions/admin";
import { getProjects } from "@/app/actions/common";

export default async function AdminProjects() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-bold">Projects</h1>

        <div className="p-6 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10">
            <h3 className="font-bold mb-4 text-lg">Add New Project</h3>
            <form action={addProject} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="title" placeholder="Project Title" required className="px-3 py-2 rounded bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)]" />
                    <input name="link" placeholder="Project Link (URL)" required className="px-3 py-2 rounded bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)]" />
                </div>
                <textarea name="description" placeholder="Description" required className="px-3 py-2 rounded bg-background/50 border border-[var(--color-primary)]/10 h-24 text-[var(--color-text-main)]" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="image" placeholder="Image URL" required className="px-3 py-2 rounded bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)]" />
                    <input name="tags" placeholder="Tags (comma separated)" className="px-3 py-2 rounded bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)]" />
                </div>
                <button type="submit" className="self-end bg-[var(--color-primary)] text-white rounded px-6 py-2 hover:opacity-90">Add Project</button>
            </form>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {projects.map((project: any) => (
                <div key={project.id} className="flex gap-4 p-4 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 group hover:border-[var(--color-primary)]/20 transition-colors">
                    <div className="w-32 h-24 rounded-lg overflow-hidden bg-black/20 shrink-0">
                         <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start">
                             <h3 className="font-bold text-lg">{project.title}</h3>
                              <form action={async () => {
                                  'use server'
                                  await deleteProject(project.id)
                              }}>
                                 <div className="flex items-center gap-1">
                                    <a href={`/admin/projects/${project.id}`} className="text-xs text-[var(--color-primary)] bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/20 px-2 py-1 rounded">Edit</a>
                                    <button className="text-red-400 hover:text-red-300 hover:bg-red-500/10 px-2 py-1 rounded text-xs">Delete</button>
                                 </div>
                              </form>
                        </div>
                        <p className="text-sm opacity-60 line-clamp-2 mb-2 flex-1">{project.description}</p>
                        <div className="flex gap-2 flex-wrap">
                            {project.tags?.map((tag: string) => (
                                <span key={tag} className="text-[10px] bg-[var(--color-primary)]/10 px-2 py-0.5 rounded-full">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}
