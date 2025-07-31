"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { createPost } from "@/lib/supabase"

const categories = ["Technology", "Design", "Writing", "Business", "Health", "Travel", "Food", "Lifestyle"]

export function CreatePostForm() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [author, setAuthor] = useState("")
  const [category, setCategory] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !content.trim() || !author.trim() || !category) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const post = await createPost({
        title: title.trim(),
        content: content.trim(),
        author: author.trim(),
        category,
      })

      toast({
        title: "Success!",
        description: "Your post has been published.",
      })

      router.push(`/post/${post.id}`)
    } catch (error) {
      console.error("Error creating post:", error)
      toast({
        title: "Error",
        description: "Failed to publish your post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="author" className="text-sm font-medium text-gray-700">
              Username
            </Label>
            <Input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter your username"
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-sm font-medium text-gray-700">
              Community
            </Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Choose a community" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    r/{cat.toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="title" className="text-sm font-medium text-gray-700">
            Title
          </Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="An interesting title"
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label htmlFor="content" className="text-sm font-medium text-gray-700">
            Text
          </Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Text (optional)"
            rows={10}
            className="mt-1"
            required
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-600 text-white">
            {isSubmitting ? "Posting..." : "Post"}
          </Button>

          <Button type="button" variant="outline" onClick={() => router.push("/")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
