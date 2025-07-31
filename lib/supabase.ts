import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface Post {
  id: string
  title: string
  content: string
  author: string
  category: string
  created_at: string
  likes: number
  comments_count: number
}

export interface Comment {
  id: string
  post_id: string
  content: string
  author: string
  created_at: string
}

export async function getPosts(search?: string, category?: string): Promise<Post[]> {
  let query = supabase
    .from("posts")
    .select(`
      *,
      comments_count:comments(count)
    `)
    .order("created_at", { ascending: false })

  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`)
  }

  if (category && category !== "All") {
    query = query.eq("category", category)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching posts:", error)
    return []
  }

  return data.map((post) => ({
    ...post,
    comments_count: post.comments_count[0]?.count || 0,
  }))
}

export async function getPost(id: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select(`
      *,
      comments_count:comments(count)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching post:", error)
    return null
  }

  return {
    ...data,
    comments_count: data.comments_count[0]?.count || 0,
  }
}

export async function getRecentPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, created_at")
    .order("created_at", { ascending: false })
    .limit(5)

  if (error) {
    console.error("Error fetching recent posts:", error)
    return []
  }

  return data
}

export async function createPost(post: {
  title: string
  content: string
  author: string
  category: string
}): Promise<Post> {
  const { data, error } = await supabase
    .from("posts")
    .insert([
      {
        ...post,
        likes: 0,
      },
    ])
    .select()
    .single()

  if (error) {
    throw new Error("Failed to create post")
  }

  return { ...data, comments_count: 0 }
}

export async function likePost(postId: string): Promise<number> {
  const { data, error } = await supabase.from("posts").select("likes").eq("id", postId).single()

  if (error) {
    throw new Error("Failed to get current likes")
  }

  const newLikes = data.likes + 1

  const { error: updateError } = await supabase.from("posts").update({ likes: newLikes }).eq("id", postId)

  if (updateError) {
    throw new Error("Failed to update likes")
  }

  return newLikes
}

export async function getComments(postId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching comments:", error)
    return []
  }

  return data
}

export async function createComment(comment: {
  post_id: string
  content: string
  author: string
}): Promise<Comment> {
  const { data, error } = await supabase.from("comments").insert([comment]).select().single()

  if (error) {
    throw new Error("Failed to create comment")
  }

  return data
}

export async function getCategoriesWithCounts() {
  const { data, error } = await supabase.from("posts").select("category")

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  // Count posts by category
  const categoryCounts = data.reduce((acc: Record<string, number>, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1
    return acc
  }, {})

  // Convert to array and sort by count
  return Object.entries(categoryCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

export async function getCommunityPosts(community: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(`
      *,
      comments_count:comments(count)
    `)
    .eq("category", community)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching community posts:", error)
    return []
  }

  return data.map((post) => ({
    ...post,
    comments_count: post.comments_count[0]?.count || 0,
  }))
}
