import { Suspense } from "react"
import { PostList } from "@/components/post-list"
import { Sidebar } from "@/components/sidebar"

export default function HomePage({
  searchParams,
}: {
  searchParams: { search?: string; category?: string }
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen sticky top-16">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-4xl mx-auto">
          <div className="bg-white">
            <Suspense fallback={<div className="text-center py-8">Loading posts...</div>}>
              <PostList searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
