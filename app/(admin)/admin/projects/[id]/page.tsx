
import { updateProject } from "@/app/actions/admin";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase.from("projects").select("*").eq("id", id).single();

  if (!project) {
    redirect("/admin/projects");
  }

  return (
    <div className="flex flex-col gap-8">
       <div className="flex flex-col gap-2">
         <h1 className="text-4xl font-bold  text-[var(--color-primary)]">Edit Project</h1>
         <p className="text-[var(--color-text-muted)]">Update project details</p>
       </div>

       <div className="p-8 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10">
           <form action={updateProject} className="flex flex-col gap-6">
               <input type="hidden" name="id" value={project.id} />

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="flex flex-col gap-2">
                     <label className="text-sm font-medium text-[var(--color-text-main)]">Project Title</label>
                     <input
                        name="title"
                        defaultValue={project.title}
                        placeholder="Project Title"
                        required
                        className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors"
                      />
                   </div>
                   <div className="flex flex-col gap-2">
                     <label className="text-sm font-medium text-[var(--color-text-main)]">Tags</label>
                     <input
                        name="tags"
                        defaultValue={project.tags?.join(', ')}
                        placeholder="Tags (comma separated)"
                        required
                        className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors"
                      />
                   </div>
               </div>

               <div className="flex flex-col gap-2">
                 <label className="text-sm font-medium text-[var(--color-text-main)]">Project Link</label>
                 <input
                    name="link"
                    defaultValue={project.link}
                    placeholder="Project Link"
                    required
                    className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors"
                  />
               </div>

               <div className="flex flex-col gap-2">
                 <label className="text-sm font-medium text-[var(--color-text-main)]">Image URL</label>
                 <input
                    name="image"
                    defaultValue={project.image}
                    placeholder="Image URL"
                    required
                    className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors"
                  />
               </div>

               <div className="flex flex-col gap-2">
                 <label className="text-sm font-medium text-[var(--color-text-main)]">Description</label>
                 <textarea
                    name="description"
                    defaultValue={project.description}
                    placeholder="Description"
                    required
                    className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors h-32 resize-none"
                  />
               </div>

               <div className="flex justify-end gap-3 pt-2">
                  <Link
                    href="/admin/projects"
                    className="px-6 py-2.5 rounded-lg border border-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/5 transition-colors text-[var(--color-text-main)]"
                  >
                    Cancel
                  </Link>
                  <button className="bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity font-medium">
                      Save Changes
                  </button>
               </div>
           </form>
       </div>
    </div>
  );
}
