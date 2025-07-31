import { PostList } from "@/components/post-list"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

interface CommunityPageProps {
  params: { community: string }
}

export default async function CommunityPage({ params }: CommunityPageProps) {
  const communityName = params.community

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen sticky top-16">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-4xl mx-auto">
          {/* Community Header */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">r/</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">r/{communityName}</h1>
                  <p className="text-gray-600">Community for {communityName} discussions</p>
                </div>
              </div>
              <Link href="/create">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Post
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-white">
            <PostList searchParams={{ category: communityName }} />
          </div>
        </div>
      </div>
    </div>
  )
}
