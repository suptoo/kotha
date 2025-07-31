"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MessageSquare, Bell, Plus, User } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">K</span>
          </div>
          <span className="text-xl font-bold text-gray-900">kotha</span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search Kotha"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </form>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-2">
          <Link href="/messages">
            <Button variant="ghost" size="sm" className="p-2">
              <MessageSquare className="h-5 w-5 text-gray-600" />
            </Button>
          </Link>
          <Link href="/notifications">
            <Button variant="ghost" size="sm" className="p-2">
              <Bell className="h-5 w-5 text-gray-600" />
            </Button>
          </Link>
          <Link href="/create">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full">
              <Plus className="h-4 w-4 mr-1" />
              Create
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="ghost" size="sm" className="p-2">
              <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
