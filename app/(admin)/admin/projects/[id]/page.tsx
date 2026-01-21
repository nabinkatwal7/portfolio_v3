
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
    <div className="flex flex-col gap-6">
       <div className="flex justify-between items-center border-b border-[var(--color-primary)]/10 pb-4">
           <h1 className="text-3xl font-bold font-[var(--font-syne)] text-[var(--color-primary)]">Edit Project</h1>
       </div>

       <div className="p-8 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10">
           <form action={updateProject} className="flex flex-col gap-4">
               <input type="hidden" name="id" value={project.id} />

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <input
                      name="title"
                      defaultValue={project.title}
                      placeholder="Project Title"
                      required
                      className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors"
                    />
                   <input
                      name="tags"
                      defaultValue={project.tags?.join(', ')}
                      placeholder="Tags (comma separated)"
                      required
                      className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors"
                    />
               </div>

               <input
                  name="link"
                  defaultValue={project.link}
                  placeholder="Project Link"
                  required
                  className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors"
                />

               <input
                  name="image"
                  defaultValue={project.image}
                  placeholder="Image URL"
                  required
                  className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors"
                />

               <textarea
                  name="description"
                  defaultValue={project.description}
                  placeholder="Description"
                  required
                  className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors h-32"
                />

               <div className="flex justify-end gap-3 pt-4">
                  <Link href="/admin/projects" className="px-6 py-2 rounded-lg border border-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/5 transition-colors">Cancel</Link>
                  <button className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
                      Save Changes
                  </button>
               </div>
           </form>
       </div>
    </div>
  );
}
