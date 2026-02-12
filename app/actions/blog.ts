"use server";

import { createServiceRoleClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { checkAuth } from "./auth";
import { validateSlug, sanitizeString, validateUrl } from "@/lib/validation";

// Helper to ensure admin access
async function requireAdmin() {
  const isAuth = await checkAuth();
  if (!isAuth) {
    throw new Error("Unauthorized");
  }
}

// Blog Posts Actions
export async function createBlogPost(formData: FormData) {
  await requireAdmin();
  const supabase = createServiceRoleClient();

  const titleInput = formData.get("title");
  const slugInput = formData.get("slug");
  const bodyInput = formData.get("body");
  const mainImageInput = formData.get("mainImage");
  const mainImageAltInput = formData.get("mainImageAlt");
  const authorId = formData.get("authorId") as string;
  const publishedAt = formData.get("publishedAt") as string;
  const categoryIds = formData.get("categoryIds") as string;

  // Validate title
  if (!titleInput || typeof titleInput !== "string" || !titleInput.trim()) {
    throw new Error("Title is required");
  }
  const title = sanitizeString(titleInput, 200);

  // Validate slug
  const slugValidation = validateSlug(slugInput);
  if (!slugValidation.valid) {
    throw new Error(slugValidation.error || "Invalid slug");
  }
  const slug = slugValidation.value!;

  // Validate body
  if (!bodyInput || typeof bodyInput !== "string" || !bodyInput.trim()) {
    throw new Error("Body is required");
  }
  const body = sanitizeString(bodyInput, 50000); // Max 50KB for blog post

  // Validate main image URL if provided
  let mainImage: string | null = null;
  if (mainImageInput && typeof mainImageInput === "string" && mainImageInput.trim()) {
    const urlValidation = validateUrl(mainImageInput.trim());
    if (!urlValidation.valid) {
      // Allow relative paths
      if (!mainImageInput.startsWith("/") && !mainImageInput.startsWith("./")) {
        throw new Error(urlValidation.error || "Invalid image URL");
      }
      mainImage = mainImageInput.trim();
    } else {
      mainImage = urlValidation.value!;
    }
  }

  const mainImageAlt = mainImageAltInput
    ? sanitizeString(mainImageAltInput, 200)
    : null;

  const { data: post, error: postError } = await supabase
    .from("blog_posts")
    .insert({
      title,
      slug,
      body,
      main_image: mainImage,
      main_image_alt: mainImageAlt,
      author_id: authorId || null,
      published_at: publishedAt || null,
    })
    .select()
    .single();

  if (postError) {
    console.error('Error creating blog post:', postError)
    // Provide more specific error messages
    if (postError.code === '23505') {
      throw new Error('A blog post with this slug already exists. Please use a different slug.')
    }
    if (postError.code === '23503') {
      throw new Error('Invalid author ID. Please select a valid author.')
    }
    throw new Error(`Failed to create blog post: ${postError.message || 'Unknown error'}`)
  }

  // Add categories if provided
  if (categoryIds && post) {
    const categoryIdsArray = categoryIds.split(',').filter(Boolean)
    if (categoryIdsArray.length > 0) {
      const categoryLinks = categoryIdsArray.map(catId => ({
        post_id: post.id,
        category_id: catId.trim(),
      }))

      await supabase.from('blog_post_categories').insert(categoryLinks)
    }
  }

  revalidatePath('/blog')
  revalidatePath(`/blog/${slug}`)
  revalidatePath('/admin/blog')

  return { success: true, id: post.id }
}

export async function updateBlogPost(formData: FormData) {
  await requireAdmin()
  const supabase = createServiceRoleClient()

  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const body = formData.get('body') as string
  const mainImage = formData.get('mainImage') as string
  const mainImageAlt = formData.get('mainImageAlt') as string
  const authorId = formData.get('authorId') as string
  const publishedAt = formData.get('publishedAt') as string
  const categoryIds = formData.get('categoryIds') as string

  if (!id || !title || !slug || !body) {
    throw new Error('ID, title, slug, and body are required')
  }

  if (!body.trim()) {
    throw new Error('Body cannot be empty')
  }

  const { error: postError } = await supabase
    .from('blog_posts')
    .update({
      title: title.trim(),
      slug: slug.trim(),
      body: body.trim(),
      main_image: mainImage?.trim() || null,
      main_image_alt: mainImageAlt?.trim() || null,
      author_id: authorId || null,
      published_at: publishedAt || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (postError) {
    console.error('Error updating blog post:', postError)
    throw new Error('Failed to update blog post')
  }

  // Update categories
  if (categoryIds !== null) {
    // Delete existing categories
    await supabase.from('blog_post_categories').delete().eq('post_id', id)

    // Add new categories
    const categoryIdsArray = categoryIds.split(',').filter(Boolean)
    if (categoryIdsArray.length > 0) {
      const categoryLinks = categoryIdsArray.map(catId => ({
        post_id: id,
        category_id: catId.trim(),
      }))

      await supabase.from('blog_post_categories').insert(categoryLinks)
    }
  }

  revalidatePath('/blog')
  revalidatePath(`/blog/${slug}`)
  revalidatePath('/admin/blog')

  return { success: true }
}

export async function deleteBlogPost(id: string) {
  await requireAdmin()
  const supabase = createServiceRoleClient()

  const { error } = await supabase.from('blog_posts').delete().eq('id', id)

  if (error) {
    console.error('Error deleting blog post:', error)
    throw new Error('Failed to delete blog post')
  }

  revalidatePath('/blog')
  revalidatePath('/admin/blog')
}

// Blog Categories Actions
export async function createBlogCategory(formData: FormData) {
  await requireAdmin()
  const supabase = createServiceRoleClient()

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string

  if (!title || !slug) {
    throw new Error('Title and slug are required')
  }

  const { error } = await supabase
    .from('blog_categories')
    .insert({ title, slug })

  if (error) {
    console.error('Error creating category:', error)
    if (error.code === '23505') {
      throw new Error('A category with this title or slug already exists. Please use a different title or slug.')
    }
    throw new Error('Failed to create category')
  }

  revalidatePath('/admin/blog')
  revalidatePath('/admin/blog/categories')
  return { success: true }
}

export async function updateBlogCategory(formData: FormData) {
  await requireAdmin()
  const supabase = createServiceRoleClient()

  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string

  if (!id || !title || !slug) {
    throw new Error('ID, title, and slug are required')
  }

  // Validate slug format
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error('Slug must contain only lowercase letters, numbers, and hyphens')
  }

  const { error } = await supabase
    .from('blog_categories')
    .update({ title: title.trim(), slug: slug.trim() })
    .eq('id', id)

  if (error) {
    console.error('Error updating category:', error)
    if (error.code === '23505') {
      throw new Error('A category with this slug already exists. Please use a different slug.')
    }
    throw new Error('Failed to update category')
  }

  revalidatePath('/admin/blog')
  revalidatePath('/admin/blog/categories')
  return { success: true }
}

export async function deleteBlogCategory(id: string) {
  await requireAdmin()
  const supabase = createServiceRoleClient()

  const { error } = await supabase.from('blog_categories').delete().eq('id', id)

  if (error) {
    console.error('Error deleting category:', error)
    throw new Error('Failed to delete category')
  }

  revalidatePath('/admin/blog')
  revalidatePath('/admin/blog/categories')
}

// Blog Authors Actions
export async function createBlogAuthor(formData: FormData) {
  await requireAdmin()
  const supabase = createServiceRoleClient()

  const name = formData.get('name') as string
  const image = formData.get('image') as string
  const bio = formData.get('bio') as string

  if (!name) {
    throw new Error('Name is required')
  }

  const { error } = await supabase
    .from('blog_authors')
    .insert({ name, image: image || null, bio: bio || null })

  if (error) {
    console.error('Error creating author:', error)
    throw new Error('Failed to create author')
  }

  revalidatePath('/admin/blog')
  return { success: true }
}

export async function updateBlogAuthor(formData: FormData) {
  await requireAdmin()
  const supabase = createServiceRoleClient()

  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const image = formData.get('image') as string
  const bio = formData.get('bio') as string

  if (!id || !name) {
    throw new Error('ID and name are required')
  }

  const { error } = await supabase
    .from('blog_authors')
    .update({
      name: name.trim(),
      image: image?.trim() || null,
      bio: bio?.trim() || null,
    })
    .eq('id', id)

  if (error) {
    console.error('Error updating author:', error)
    throw new Error('Failed to update author')
  }

  revalidatePath('/admin/blog')
  revalidatePath('/admin/blog/authors')
  return { success: true }
}

export async function deleteBlogAuthor(id: string) {
  await requireAdmin()
  const supabase = createServiceRoleClient()

  const { error } = await supabase.from('blog_authors').delete().eq('id', id)

  if (error) {
    console.error('Error deleting author:', error)
    throw new Error('Failed to delete author')
  }

  revalidatePath('/admin/blog')
  revalidatePath('/admin/blog/authors')
}
