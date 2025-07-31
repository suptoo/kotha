"use client"

import Link from "next/link"
import { Home, TrendingUp, HelpCircle, Compass, List, Plus, Settings, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Sidebar() {
  const [customFeedsOpen, setCustomFeedsOpen] = useState(false)
  const [communitiesOpen, setCommunitiesOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)

  return (
    <div className="p-4 space-y-1">
      {/* Main Navigation */}
      <div className="space-y-1">
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start bg-gray-100 text-gray-900">
            <Home className="h-5 w-5 mr-3" />
            Home
          </Button>
        </Link>

        <Link href="/?sort=popular">
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-gray-100">
            <TrendingUp className="h-5 w-5 mr-3" />
            Popular
          </Button>
        </Link>

        <Link href="/?category=answers">
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-gray-100">
            <HelpCircle className="h-5 w-5 mr-3" />
            Answers
            <span className="ml-auto text-xs bg-orange-500 text-white px-1.5 py-0.5 rounded">BETA</span>
          </Button>
        </Link>

        <Link href="/?sort=trending">
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-gray-100">
            <Compass className="h-5 w-5 mr-3" />
            Explore
          </Button>
        </Link>

        <Link href="/?view=all">
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-gray-100">
            <List className="h-5 w-5 mr-3" />
            All
          </Button>
        </Link>

        <Link href="/keywords">
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-gray-100">
            <Plus className="h-5 w-5 mr-3" />
            Add Keywords
          </Button>
        </Link>
      </div>

      <hr className="my-4 border-gray-200" />

      {/* Custom Feeds */}
      <div>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-500 text-xs uppercase tracking-wide font-medium"
          onClick={() => setCustomFeedsOpen(!customFeedsOpen)}
        >
          <ChevronDown className={`h-4 w-4 mr-2 transition-transform ${customFeedsOpen ? "rotate-180" : ""}`} />
          Custom Feeds
        </Button>
        {customFeedsOpen && (
          <div className="ml-6 mt-2">
            <Link href="/create-feed">
              <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-gray-100">
                <Plus className="h-4 w-4 mr-3" />
                Create Custom Feed
              </Button>
            </Link>
          </div>
        )}
      </div>

      <hr className="my-4 border-gray-200" />

      {/* Communities */}
      <div>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-500 text-xs uppercase tracking-wide font-medium"
          onClick={() => setCommunitiesOpen(!communitiesOpen)}
        >
          <ChevronDown className={`h-4 w-4 mr-2 transition-transform ${communitiesOpen ? "rotate-180" : ""}`} />
          Communities
        </Button>
        {communitiesOpen && (
          <div className="ml-6 mt-2 space-y-1">
            <Link href="/create-community">
              <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-gray-100">
                <Plus className="h-4 w-4 mr-3" />
                Create Community
              </Button>
            </Link>
            <Link href="/communities">
              <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-gray-100">
                <Settings className="h-4 w-4 mr-3" />
                Manage Communities
              </Button>
            </Link>
          </div>
        )}
      </div>

      <hr className="my-4 border-gray-200" />

      {/* Resources */}
      <div>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-500 text-xs uppercase tracking-wide font-medium"
          onClick={() => setResourcesOpen(!resourcesOpen)}
        >
          <ChevronDown className={`h-4 w-4 mr-2 transition-transform ${resourcesOpen ? "rotate-180" : ""}`} />
          Resources
        </Button>
        {resourcesOpen && (
          <div className="ml-6 mt-2">
            <Link href="/about">
              <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-gray-100">
                About Kotha
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
