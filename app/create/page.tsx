import { CreatePostForm } from "@/components/create-post-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Create a post</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        <CreatePostForm />
      </div>
    </div>
  )
}
