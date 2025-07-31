"use client"

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown, MessageSquare, Share, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { likePost } from "@/lib/supabase"

interface Post {
  id: string
  title: string
  content: string
  author: string
  category: string
  created_at: string
  likes: number
  comments_count: number
}

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const [likes, setLikes] = useState(post.likes)
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null)
  const [isLiking, setIsLiking] = useState(false)
  const [isJoined, setIsJoined] = useState(false)

  const handleVote = async (voteType: "up" | "down") => {
    if (isLiking) return
    setIsLiking(true)

    try {
      if (voteType === "up") {
        const newLikes = await likePost(post.id)
        setLikes(newLikes)
        setUserVote(userVote === "up" ? null : "up")
      }
    } catch (error) {
      console.error("Error voting:", error)
    } finally {
      setIsLiking(false)
    }
  }

  const handleJoin = () => {
    setIsJoined(!isJoined)
  }

  const excerpt = post.content.length > 300 ? post.content.substring(0, 300) + "..." : post.content

  return (
    <div className="bg-white border-b border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex">
        {/* Vote Section */}
        <div className="flex flex-col items-center p-2 bg-gray-50 w-12">
          <Button
            variant="ghost"
            size="sm"
            className={`p-1 h-6 w-6 ${userVote === "up" ? "text-orange-500" : "text-gray-400 hover:text-orange-500"}`}
            onClick={() => handleVote("up")}
            disabled={isLiking}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>

          <span
            className={`text-xs font-bold py-1 ${userVote === "up" ? "text-orange-500" : userVote === "down" ? "text-blue-500" : "text-gray-700"}`}
          >
            {likes}
          </span>

          <Button
            variant="ghost"
            size="sm"
            className={`p-1 h-6 w-6 ${userVote === "down" ? "text-blue-500" : "text-gray-400 hover:text-blue-500"}`}
            onClick={() => handleVote("down")}
            disabled={isLiking}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-3">
          {/* Post Meta */}
          <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">r/</span>
            </div>
            <Link href={`/r/${post.category.toLowerCase()}`} className="font-medium text-gray-900 hover:underline">
              r/{post.category.toLowerCase()}
            </Link>
            <span>•</span>
            <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
            <span>•</span>
            <span>Suggested for you</span>
            <div className="ml-auto">
              <Button
                onClick={handleJoin}
                className={`text-xs px-3 py-1 rounded-full h-6 ${
                  isJoined ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                {isJoined ? "Joined" : "Join"}
              </Button>
              <Link href={`/post/${post.id}/options`}>
                <Button variant="ghost" size="sm" className="p-1 ml-2">
                  <MoreHorizontal className="h-4 w-4 text-gray-400" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Post Title */}
          <Link href={`/post/${post.id}`}>
            <h2 className="text-lg font-medium text-gray-900 mb-2 hover:underline cursor-pointer leading-tight">
              {post.title}
            </h2>
          </Link>

          {/* Post Content */}
          <p className="text-gray-700 text-sm leading-relaxed mb-3">{excerpt}</p>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Link href={`/post/${post.id}#comments`}>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:bg-gray-100 text-xs">
                <MessageSquare className="h-4 w-4 mr-1" />
                {post.comments_count}
              </Button>
            </Link>

            <Button variant="ghost" size="sm" className="text-gray-500 hover:bg-gray-100 text-xs">
              <Share className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
