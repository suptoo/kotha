import { getPosts } from "@/lib/supabase"
import { PostCard } from "./post-card"
import { SortingTabs } from "./sorting-tabs"

interface PostListProps {
  searchParams: { search?: string; category?: string }
}

export async function PostList({ searchParams }: PostListProps) {
  const posts = await getPosts(searchParams.search, searchParams.category)

  return (
    <div>
      <SortingTabs />

      {posts.length === 0 ? (
        <div className="text-center py-12 bg-white">
          <p className="text-gray-500 text-lg">No posts found. Be the first to share your story!</p>
        </div>
      ) : (
        <div>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
