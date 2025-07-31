"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Calendar } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export function SortingTabs() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSort = searchParams.get("sort") || "best"

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("sort", sort)
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          className={`text-sm font-medium ${currentSort === "best" ? "text-gray-900 bg-gray-100" : "text-gray-600"}`}
          onClick={() => handleSortChange("best")}
        >
          Best
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>

        <Button
          variant="ghost"
          className={`text-sm ${currentSort === "hot" ? "text-gray-900 bg-gray-100" : "text-gray-600 hover:bg-gray-100"}`}
          onClick={() => handleSortChange("hot")}
        >
          Hot
        </Button>

        <Button
          variant="ghost"
          className={`text-sm ${currentSort === "new" ? "text-gray-900 bg-gray-100" : "text-gray-600 hover:bg-gray-100"}`}
          onClick={() => handleSortChange("new")}
        >
          New
        </Button>

        <Button
          variant="ghost"
          className={`text-sm ${currentSort === "top" ? "text-gray-900 bg-gray-100" : "text-gray-600 hover:bg-gray-100"}`}
          onClick={() => handleSortChange("top")}
        >
          Top
        </Button>

        <Button variant="ghost" className="text-sm text-gray-600 hover:bg-gray-100">
          <Calendar className="h-4 w-4 mr-1" />
        </Button>
      </div>
    </div>
  )
}
