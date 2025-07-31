import { getRecentPosts } from "@/lib/supabase"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export async function RecentPosts() {
  const recentPosts = await getRecentPosts()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Posts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentPosts.map((post) => (
          <div key={post.id}>
            <Link href={`/post/${post.id}`}>
              <h4 className="font-medium text-gray-900 hover:text-purple-600 cursor-pointer leading-snug text-sm">
                {post.title}
              </h4>
            </Link>
          </div>
        ))}

        <Link href="/" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
          See the full list
        </Link>
      </CardContent>
    </Card>
  )
}
