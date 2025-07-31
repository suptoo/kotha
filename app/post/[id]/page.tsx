import { getPost, getComments } from "@/lib/supabase"
import { PostDetail } from "@/components/post-detail"
import { CommentSection } from "@/components/comment-section"
import { notFound } from "next/navigation"

interface PostPageProps {
  params: { id: string }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.id)

  if (!post) {
    notFound()
  }

  const comments = await getComments(params.id)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <PostDetail post={post} />
          <CommentSection postId={params.id} initialComments={comments} />
        </div>
      </div>
    </div>
  )
}
