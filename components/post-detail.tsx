"use client"

import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, Clock, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { likePost } from "@/lib/supabase"
import Link from "next/link"

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

interface PostDetailProps {
  post: Post
}

export function PostDetail({ post }: PostDetailProps) {
  const [likes, setLikes] = useState(post.likes)
  const [isLiking, setIsLiking] = useState(false)

  const handleLike = async () => {
    if (isLiking) return
    setIsLiking(true)

    try {
      const newLikes = await likePost(post.id)
      setLikes(newLikes)
    } catch (error) {
      console.error("Error liking post:", error)
    } finally {
      setIsLiking(false)
    }
  }

  return (
    <div className="space-y-6">
      <Link href="/">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </Link>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                {post.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-lg">{post.author}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
                  <span>•</span>
                  <span>{Math.ceil(post.content.length / 200)} min read</span>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="text-sm">
              {post.category}
            </Badge>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 leading-tight">{post.title}</h1>
        </CardHeader>

        <CardContent>
          <div className="prose prose-lg max-w-none mb-8">
            {post.content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex items-center justify-between pt-6 border-t">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={handleLike}
                disabled={isLiking}
                className="text-gray-500 hover:text-red-500"
              >
                <Heart className="h-5 w-5 mr-2" />
                {likes} Likes
              </Button>

              <Button variant="ghost" className="text-gray-500 hover:text-blue-500">
                <MessageCircle className="h-5 w-5 mr-2" />
                {post.comments_count} Comments
              </Button>

              <Button variant="ghost" className="text-gray-500 hover:text-green-500">
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
